import lottery_MsgStation from '../../Data/lottery_MsgStation'
import lottery_videoFlow from './lottery_videoFlow';
import lottery_VideoSysCtr from './lottery_VideoSysCtr';
cc.Class({
    extends: require("lottery_viewBaseComponent"),
    properties: {
        tips: [cc.Node],
        bg: cc.Node,
        backBtn: cc.Node,//返回按钮
        videoFlow: lottery_videoFlow
    },
    /*------------------子类重写函数---------------*/
    OnInit() {
        this.moduleName = "videoSysPre";
    },
    OnShow() {
        lottery_MsgStation.getInstance().onSendLinkHeGuan();
        lottery_MsgStation.getInstance().simulationAward();
    },
    onEnable() {
        this.backBtn.on(cc.Node.EventType.TOUCH_END, this.backBtnDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },
    onDisable() {
        this.backBtn.off(cc.Node.EventType.TOUCH_END, this.backBtnDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },
    OnHide() {
    },
    OnDispose() { },
    _onMessageHandel(data) {
        switch (data.type) {
            case 1: //链接荷官端提示
                this.tips[0].active = true;
                this.tips[1].active = false;
                this.tips[2].active = false;
                this.backBtn.active = true;
                break;
            case 2: //链接成功提示
                this.tips[0].active = false;
                this.tips[1].active = true;
                this.tips[2].active = false;
                setTimeout(() => {
                    lottery_VideoSysCtr.getInstance().OnMessageHandle({ type: 4 });
                }, 500);
                break;
            case 3://连接失败
                this.tips[0].active = false;
                this.tips[1].active = false;
                this.tips[2].active = true;
                break;
            case 4://开启视频流程
                this.tips[0].active = false;
                this.tips[1].active = false;
                this.tips[2].active = false;
                this.bg.active = false;
                this.backBtn.active = false;
                this.videoFlow.startPlay();
                break;
            default:
                console.log(data);
                break;
        }
    },
    /**---------------------------------------------事件----------------------------------------------------- */
    backBtnDown() {
        console.log("退出事件");
        this.videoFlow.stopPlay();
        lottery_MsgStation.getInstance().onBackToSys();
    },
    escEvent(event) {
        switch (event.keyCode) {
            case cc.KEY.escape:
                this.backBtnDown();
                break;
        }
    }
});