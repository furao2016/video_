(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/GameStart.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c60d75qnF9Mf410p2lmP1d/', 'GameStart', __filename);
// Scripts/GameStart.js

"use strict";

var _lottery_MsgStation = require("./Data/lottery_MsgStation");

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

var _lottery_animDataMgr = require("./Data/lottery_animDataMgr");

var _lottery_animDataMgr2 = _interopRequireDefault(_lottery_animDataMgr);

var _lottery_VideoPlayCtr = require("./UI/view_videoPlay/lottery_VideoPlayCtr");

var _lottery_VideoPlayCtr2 = _interopRequireDefault(_lottery_VideoPlayCtr);

var _lottery_loginViewCtr = require("./UI/view_login/lottery_loginViewCtr");

var _lottery_loginViewCtr2 = _interopRequireDefault(_lottery_loginViewCtr);

var _lottery_lotteryData = require("./Data/lottery_lotteryData");

var _lottery_lotteryData2 = _interopRequireDefault(_lottery_lotteryData);

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
            // (require('videoSocketController'))(ebet.baccarat); //初始化web端的直播视频
        }
        cc.loader.loadRes("config", this.setLoadingProgress.bind(this), function (err, res) {
            if (err) {
                cc.error(err);
                return;
            }
            var instance = _lottery_MsgStation2.default.getInstance();
            var json = _lottery_lotteryData2.default.getInstance().isLocal ? res.local : res.work;
            instance.httpServer = json.HttpServer;
            instance.socketIP = json.SocketIP;
            instance.socketPort = json.SocketPort;
        });
        _lottery_animDataMgr2.default.getInstance().init(this.setLoadingProgress.bind(this), function () {
            _lottery_loginViewCtr2.default.getInstance().Open();
            _this.loadingNode.active = false;
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameStart.js.map
        