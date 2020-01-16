import lottery_MsgStation, { simulationAward } from "./Data/lottery_MsgStation";
import lottery_animDataMgr from "./Data/lottery_animDataMgr";
import lottery_VideoPlayCtr from "./UI/view_videoPlay/lottery_VideoPlayCtr";
import lottery_loginViewCtr from "./UI/view_login/lottery_loginViewCtr";
import lottery_lotteryData from "./Data/lottery_lotteryData";
cc.Class({
    extends: cc.Component,
    properties: {
        loadingNode: cc.Node,
        loadingProgress: cc.ProgressBar,
        loadingStr: cc.Label
    },
    start() {
        this._GameStart();
    },
    _GameStart() {
        if (cc.sys.isBrowser) {
            (require('AAC'))(window); //初始化web端的直播视频
            (require('videoSocketController'))(ebet.baccarat); //初始化web端的直播视频
        }
        cc.loader.loadRes("config", this.setLoadingProgress.bind(this), (err, res) => {
            if (err) {
                cc.error(err)
                return
            }
            let instance = lottery_MsgStation.getInstance();
            let json = lottery_lotteryData.getInstance().isLocal ? res.local : res.work;
            instance.httpServer = json.HttpServer
            instance.socketIP = json.SocketIP
            instance.socketPort = json.SocketPort
        })
        lottery_animDataMgr.getInstance().init(this.setLoadingProgress.bind(this), () => {
            lottery_loginViewCtr.getInstance().Open();
            this.loadingNode.active = false;
        });

    },

    //设置播放精度条
    setLoadingProgress(n, t) {
        let pre = n / t
        !this.loadingStr.node.active && (this.loadingStr.node.active = true);
        this.loadingProgress.progress = pre;
        this.loadingStr.string = (pre * 100).toFixed(2) + '%';
    }
});
//注册一个视频退出全屏事件,防止报错
document.exitFullscreen = (one) => { };
cc.director.setClearColor(new cc.Color(0, 0, 0, 0));
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
cc.game.setFrameRate(30);
