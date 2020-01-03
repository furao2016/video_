import lottery_MsgStation from "../../Data/lottery_MsgStation";
import lottery_videoCom from "../videoCom/lottery_videoCom"
cc.Class({
    extends: require("lottery_viewBaseComponent"),
    properties: {
        exitBtn: cc.Node,
        videoPlayBtn: cc.Node,
        videoCanvas: [lottery_videoCom],
        inputEvents: cc.Node,
        bigCanvas: cc.Sprite
    },
    /*----------------------------------生命周期函数-----------------------------------------*/
    OnInit() {
        this.moduleName = "videoSysPre";
        this.exitBtn.on(cc.Node.EventType.TOUCH_END, this.exitBtnDown, this);
        this.videoPlayBtn.on(cc.Node.EventType.TOUCH_END, this.videoPlayBtnDown, this);
        this.initVideo();
    },
    OnShow() { },
    OnHide() { },
    OnDispose() { },
    _onMessageHandel(data) {

    },
    /*--------------------------------------相关设置-----------------------------------------*/
    initVideo() {
        let videoUrl = ["ws://47.90.11.101:8081/lobbyB/L01", "ws://47.90.11.101:8081/lobbyB/L01-1"];
        this.videoCanvas.forEach((element, index) => {
            element.init(videoUrl[index], ebet.baccarat);
            element.isPlay = true;
        });
    },
    /*-------------------------------------------事件-----------------------------------------*/
    //退出
    exitBtnDown() {
        lottery_MsgStation.getInstance().onSendLogoutContent();
    },
    //全屏播放
    videoPlayBtnDown() {
        lottery_MsgStation.getInstance().onFullPlay();
    },
    //小窗口全屏播放
    screenBtnDown(event, data) {
        if (!this.videoCanvas[data].loadOver) return;
        this.videoCanvas[data].changeTargetSprite(this.bigCanvas);
        this.inputEvents.active = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },
    //退出小屏的全屏播放
    exitScreen() {
        this.bigCanvas.spriteFrame = null;
        this.inputEvents.active = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },
    escEvent(event) {
        switch (event.keyCode) {
            case cc.KEY.escape:
                this.exitScreen();
                break;
        }
    }
});