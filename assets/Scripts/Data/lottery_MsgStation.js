import SingletonBase from "../Singleton/SingletonBase";
import NetManager from "../Manager/lottery_NetManager";
import SocketManager from "../Manager/lottery_SocketManager";
import MsgDefine from "../Manager/lottery_SockMsgDefine";
import GlobalMsg from "../Core/Event/lottery_GlobalMsg";
import { lottery_EventDefine } from "./lottery_EventDefine";
import Helper from "../UI/tools/lottery_helper";
import lottery_VideoSysCtr from "../UI/view_videoSys/lottery_VideoSysCtr";
import lottery_loginViewCtr from "../UI/view_login/lottery_loginViewCtr";
import lottery_VideoPlayCtr from "../UI/view_videoPlay/lottery_VideoPlayCtr";
import videosMsgFatory from "../UI/view_videoSys/videoMsgFactory";
import lottery_lotteryData from "./lottery_lotteryData";
/**
 * 消息中转
 */
export default class lottery_MsgStation extends SingletonBase {
    httpServer = "";
    socketIP = "";
    socketPort = "";
    loging = false; //登陆中

    static _onNewObject() {
        let one = new lottery_MsgStation();
        one.noticeInit();
        one.sysEventInit();
        return one;
    }
    /**
     * ws消息初始化
     */
    noticeInit() {
        let socket = SocketManager.getInstance();
        socket.On(MsgDefine.DOWN.SC_OK, this.socketConnect, this);
        socket.On(MsgDefine.DOWN.SC_VideoMsg, this.videoMsg, this);
        socket.On(MsgDefine.DOWN.SC_KaiPan, this.lotteryOpeningOrClosed, this);
        socket.On(MsgDefine.DOWN.SC_JianQi, this.setJianQi, this);
        socket.On(MsgDefine.DOWN.SC_JIANQIU, this.lotteryResults, this);
        socket.On(MsgDefine.DOWN.SC_VideoUrl, this.lotteryVideoUrlChange, this);
    }
    /**
     * 系统消息初始化
     */
    sysEventInit() {
        GlobalMsg.getInstance().Register(lottery_EventDefine.sys.loadingOvertime, this.loadingOvertime);
    }

    /*----------------------------------------------本地事件------------------------------------------------*/
    /**
    * 登录
    */
    onSendEnterLogin(account, password) {
        Helper.getInstance().showLoading();
        NetManager.getInstance().HttpPost(this.httpServer + 'dealer/login/video/check', { "userName": account, "password": password }, (error, msg) => {
            Helper.getInstance().showLoading(false);
            if (error) {
                Helper.getInstance().showTips('网络错误');
                return;
            }
            switch (msg.code) {
                case 1:
                    lottery_lotteryData.getInstance().updataData(msg.data);
                    lottery_loginViewCtr.getInstance().OnMessageHandle({ type: 1, data: lottery_lotteryData.getInstance().roleList });
                    break;
                case 0:
                    Helper.getInstance().showTips('检查下服务器');
                    break;
                default:
                    Helper.getInstance().showTips('密码或者账号错误');
                    break;
            }
        });
    }

    /**
     *根据彩种登陆
     */
    onSendLotteryChoice(lotteryCode) {
        Helper.getInstance().showLoading();
        lottery_lotteryData.getInstance().lotteryCode = lotteryCode;
        SocketManager.getInstance().Connect(this.socketIP, this.socketPort, lottery_lotteryData.getInstance().userId);//与服务器建立长连接
    }

    /**
     * 链接荷官端
     */
    onSendLinkHeGuan() {
        Helper.getInstance().showLoading();
        let one = {
            'codeBack': 2020,
            'data': {
                'lotteryCode': lottery_lotteryData.getInstance().lotteryCode
            }
        };
        SocketManager.getInstance().Send(JSON.stringify(one));
        lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 1 });
    }

    /**
     * 荷官端链接成功准备播放视频
     */
    onSendLinkHeGuanSuccess() {
        Helper.getInstance().showLoading(false);
        lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 2 });
    }
    /**
     * 切换到全屏播放
     */
    onFullPlay() {
        lottery_VideoPlayCtr.getInstance().Close();
        lottery_VideoSysCtr.getInstance().Open();
        //切换到全屏
        screenfull.request(document.getElementById('Cocos2dGameContainer'));
    }
    /**
     * 回到系统
     */
    onBackToSys() {
        Helper.getInstance().showLoading(false);
        lottery_VideoPlayCtr.getInstance().Open();
        lottery_VideoSysCtr.getInstance().Close();
    }
    /**
    * 退出
    */
    onSendLogoutContent() {
        SocketManager.getInstance().close();
        lottery_VideoPlayCtr.getInstance().Close();
        lottery_loginViewCtr.getInstance().Open();

    }
    /*------------------------------------------socket回调--------------------------------------*/
    //建立长连接成功
    socketConnect(data) {
        this.getVideoUrl();
        lottery_loginViewCtr.getInstance().Close();
        lottery_VideoPlayCtr.getInstance().Open();
        Helper.getInstance().showLoading(false);
    }

    //链接何荷官端后得回调
    videoMsg(data) {
        if (data == 1)
            lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 2 })
        else if (data == 0)
            lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 3 });
    }
    //接收到开封盘命令
    lotteryOpeningOrClosed(data) {
        if (data == 0) {
            videosMsgFatory.ins().changePeriod(-1);
        } else {
            videosMsgFatory.ins().changePeriod(1);
        }
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.RESTART);
    }
    //收到奖期之后 马上跳播
    setJianQi(data) {
        lottery_lotteryData.getInstance().expect = data.expect;
        lottery_lotteryData.getInstance().nestExpect = data.nestExpect;
        videosMsgFatory.ins().changePeriod(0);
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.RESTART);
        videosMsgFatory.ins().changePeriod(-1);
    }

    //接收到当前期售彩结束准备开奖,?第一期 马上跳播
    lotteryOpenAward() {
        videosMsgFatory.ins().changePeriod(0);
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.RESTART);
    }

    //接收到当前期播放倒计时
    lotteryReadyAward(data) {
        videosMsgFatory.ins().countDownTime = data;
    }
    //接收到开奖结果
    lotteryResults(data) {
        console.log(data);
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.BALLINFO, data);
    }
    /**接收到视频链接更改*/
    lotteryVideoUrlChange(data) {
        lottery_lotteryData.getInstance().videoUrl = data.videoUrl;
    }
    /**请求视频链接*/
    getVideoUrl() {
        let msg = {};
        msg.codeBack = SockMsgDefine.DOWN.SC_VideoUrl;
        msg.data = { type: "GET", lotteryCode: lottery_lotteryData.getInstance().lotteryCode };
        SocketManager.getInstance().Send(msg);
    }
    /*-----------------------------------------系统事件回调-----------------------------------------*/
    loadingOvertime() {
        console.log("加载超时");
    }
}

export function simulationAward() {
    let one = 0;
    setTimeout(() => {
        lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 4 });
        setTimeout(() => {
            lottery_MsgStation.getInstance().lotteryOpeningOrClosed(0);
            setTimeout(() => {
                lottery_MsgStation.getInstance().setJianQi({ expect: 11, nestExpect: 12 })
            }, 10000);
        }, 10000);
    }, 5000);
}