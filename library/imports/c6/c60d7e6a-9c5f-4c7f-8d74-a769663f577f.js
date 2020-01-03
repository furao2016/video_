"use strict";
cc._RF.push(module, 'c60d75qnF9Mf410p2lmP1d/', 'GameStart');
// Scripts/GameStart.js

"use strict";

var _lottery_MsgStation = require("./Data/lottery_MsgStation");

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

var _lottery_animDataMgr = require("./Data/lottery_animDataMgr");

var _lottery_animDataMgr2 = _interopRequireDefault(_lottery_animDataMgr);

var _lottery_loginViewCtr = require("./UI/view_login/lottery_loginViewCtr");

var _lottery_loginViewCtr2 = _interopRequireDefault(_lottery_loginViewCtr);

var _lottery_VideoPlayCtr = require("./UI/view_videoPlay/lottery_VideoPlayCtr");

var _lottery_VideoPlayCtr2 = _interopRequireDefault(_lottery_VideoPlayCtr);

var _lottery_VideoSysCtr = require("./UI/view_videoSys/lottery_VideoSysCtr");

var _lottery_VideoSysCtr2 = _interopRequireDefault(_lottery_VideoSysCtr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,
    properties: {
        loadingNode: cc.Node,
        loadingProgress: cc.ProgressBar,
        loadingStr: cc.Label
    },
    start: function start() {
        this._GameStart();
    },
    _GameStart: function _GameStart() {
        var _this = this;

        if (cc.sys.isBrowser) {
            require('AAC')(window); //初始化web端的直播视频
            require('videoSocketController')(ebet.baccarat); //初始化web端的直播视频
        }
        cc.loader.loadRes("config", this.setLoadingProgress.bind(this), function (err, res) {
            if (err) {
                cc.error(err);
                return;
            }
            var json = JSON.parse(res);
            var instance = _lottery_MsgStation2.default.getInstance();
            instance.httpServer = json.HttpServer;
            instance.socketIP = json.SocketIP;
            instance.socketPort = json.SocketPort;
        });
        _lottery_animDataMgr2.default.getInstance().init(this.setLoadingProgress.bind(this), function () {
            //       lottery_loginViewCtr.getInstance().Open();
            _this.loadingNode.active = false;
            _lottery_VideoSysCtr2.default.getInstance().Open();
            (0, _lottery_MsgStation.simulationAward)();
        });
    },


    //设置播放精度条
    setLoadingProgress: function setLoadingProgress(n, t) {
        var pre = n / t;
        !this.loadingStr.node.active && (this.loadingStr.node.active = true);
        this.loadingProgress.progress = pre;
        this.loadingStr.string = (pre * 100).toFixed(2) + '%';
    }
});
//注册一个视频退出全屏事件,防止报错
document.exitFullscreen = function (one) {};
cc.director.setClearColor(new cc.Color(0, 0, 0, 0));
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
cc.game.setFrameRate(30);

cc._RF.pop();