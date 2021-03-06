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
    lotteryData = lottery_lotteryData.getInstance();

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
        NetManager.getInstance().HttpPost(this.lotteryData.network.httpServer + 'dealer/login/video/check', { "userName": account, "password": password }, (error, msg) => {
            Helper.getInstance().showLoading(false);
            if (error) {
                Helper.getInstance().showTips('网络错误');
                return;
            }
            switch (msg.code) {
                case 1:
                    lottery_lotteryData.getInstance().updataData(msg.data);
                    console.log(msg.data);
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
        this.lotteryData.lotteryCode = lotteryCode;
        SocketManager.getInstance().Connect(this.lotteryData.network.socketIP, this.lotteryData.network.socketPort, this.lotteryData.userId);//与服务器建立长连接
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
        Helper.getInstance().showLoading();
        let lotteryData = lottery_lotteryData.getInstance();
        NetManager.getInstance().HttpPost(this.lotteryData.network.httpServer + 'dealer/login/video/loginOut',
            { "lotteryCode": lotteryData.lotteryCode, "userId": lotteryData.userId, 'token': lotteryData.token }, (error, msg) => {
                Helper.getInstance().showLoading(false);
                if (error) {
                    Helper.getInstance().showTips('网络错误');
                }
                lottery_VideoPlayCtr.getInstance().Open();
                lottery_VideoSysCtr.getInstance().Close();
                lotteryData.isPass = false;
                console.log("设置为荷官端不同意");
            });

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
        if (lottery_lotteryData.getInstance().pageTag != 0) return;
        console.log('建立长链接');
        lottery_loginViewCtr.getInstance().Close();
        lottery_VideoPlayCtr.getInstance().Open();
        Helper.getInstance().showLoading(false);
    }

    //链接何荷官端后得回调
    videoMsg(data) {
        if (data == 1) {
            lottery_lotteryData.getInstance().isPass = true;
            lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 2 })
        }
        else if (data == 0) {
            console.log("荷官端不同意");
            lottery_lotteryData.getInstance().isPass = false;
            lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 3 });
        }

    }
    //接收到开封盘命令
    lotteryOpeningOrClosed(data) {
        console.log('开封盘消息', data);
        if (!lottery_lotteryData.getInstance().isPass) return;
        if (data == 0) {
            videosMsgFatory.ins().changePeriod(-1);
        } else {
            videosMsgFatory.ins().changePeriod(2);
        }
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.RESTART);
    }
    //收到奖期之后 马上跳播
    setJianQi(data) {
        console.log('奖期信息', data);
        if (!lottery_lotteryData.getInstance().isPass) return;
        lottery_lotteryData.getInstance().expect = data.expect;
        lottery_lotteryData.getInstance().nestExpect = data.nestExpect;
        videosMsgFatory.ins().changePeriod(0);
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.RESTART);
        videosMsgFatory.ins().changePeriod(-1);
    }

    //接收到当前期售彩结束准备开奖,?第一期 马上跳播
    lotteryOpenAward() {
        console.log('第一期跳播');
        if (!lottery_lotteryData.getInstance().isPass) return;
        videosMsgFatory.ins().changePeriod(0);
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.RESTART);
    }

    //接收到当前期播放倒计时
    lotteryReadyAward(data) {
        videosMsgFatory.ins().countDownTime = data;
    }
    //接收到开奖结果
    lotteryResults(data) {
        console.log('开奖结果', data);
        if (!lottery_lotteryData.getInstance().isPass) return;
        cc.systemEvent.emit(lottery_EventDefine.VIDEOFLOW.BALLINFO, data);
    }
    /**接收到视频链接更改*/
    lotteryVideoUrlChange(data) {
        lottery_lotteryData.getInstance().videoUrl = JSON.parse(data.videoUrl);
        console.log(lottery_lotteryData.getInstance().videoUrl);
    }
    /**请求视频链接*/
    getVideoUrl() {
        let msg = {};
        msg.codeBack = MsgDefine.DOWN.SC_VideoUrl;
        msg.data = { type: "GET", lotteryCode: lottery_lotteryData.getInstance().lotteryCode };
        SocketManager.getInstance().Send(JSON.stringify(msg));
    }
    /*-----------------------------------------系统事件回调-----------------------------------------*/
    loadingOvertime() {
        console.log("加载超时");
    }
    /**模拟开奖 */
    simulationAward() {
        if (!lottery_lotteryData.getInstance().simulated) return;
        lottery_lotteryData.getInstance().isPass = true;
        let one = 0;
        setTimeout(() => {
            lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 4 });
            setTimeout(() => {
                lottery_MsgStation.getInstance().lotteryOpeningOrClosed(0);
                setTimeout(() => {
                    lottery_MsgStation.getInstance().setJianQi({ expect: 1000000001, nestExpect: 1000000002 })
                }, 10000);
            }, 10000);
        }, 1000);
    }
}
