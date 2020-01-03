(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/UI/view_videoPlay/lottery_VideoPlayView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e147zuNC5KEJeTE9e0szXx', 'lottery_VideoPlayView', __filename);
// Scripts/UI/view_videoPlay/lottery_VideoPlayView.js

"use strict";

var _lottery_MsgStation = require("../../Data/lottery_MsgStation");

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

var _lottery_videoCom = require("../videoCom/lottery_videoCom");

var _lottery_videoCom2 = _interopRequireDefault(_lottery_videoCom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: require("lottery_viewBaseComponent"),
    properties: {
        exitBtn: cc.Node,
        videoPlayBtn: cc.Node,
        videoCanvas: [_lottery_videoCom2.default],
        inputEvents: cc.Node,
        bigCanvas: cc.Sprite
    },
    /*----------------------------------生命周期函数-----------------------------------------*/
    OnInit: function OnInit() {
        this.moduleName = "videoSysPre";
        this.exitBtn.on(cc.Node.EventType.TOUCH_END, this.exitBtnDown, this);
        this.videoPlayBtn.on(cc.Node.EventType.TOUCH_END, this.videoPlayBtnDown, this);
        this.initVideo();
    },
    OnShow: function OnShow() {},
    OnHide: function OnHide() {},
    OnDispose: function OnDispose() {},
    _onMessageHandel: function _onMessageHandel(data) {},

    /*--------------------------------------相关设置-----------------------------------------*/
    initVideo: function initVideo() {
        var videoUrl = ["ws://47.90.11.101:8081/lobbyB/L01", "ws://47.90.11.101:8081/lobbyB/L01-1"];
        this.videoCanvas.forEach(function (element, index) {
            element.init(videoUrl[index], ebet.baccarat);
            element.isPlay = true;
        });
    },

    /*-------------------------------------------事件-----------------------------------------*/
    //退出
    exitBtnDown: function exitBtnDown() {
        _lottery_MsgStation2.default.getInstance().onSendLogoutContent();
    },

    //全屏播放
    videoPlayBtnDown: function videoPlayBtnDown() {
        _lottery_MsgStation2.default.getInstance().onFullPlay();
    },

    //小窗口全屏播放
    screenBtnDown: function screenBtnDown(event, data) {
        if (!this.videoCanvas[data].loadOver) return;
        this.videoCanvas[data].changeTargetSprite(this.bigCanvas);
        this.inputEvents.active = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },

    //退出小屏的全屏播放
    exitScreen: function exitScreen() {
        this.bigCanvas.spriteFrame = null;
        this.inputEvents.active = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },
    escEvent: function escEvent(event) {
        switch (event.keyCode) {
            case cc.KEY.escape:
                this.exitScreen();
                break;
        }
    }
});

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
        //# sourceMappingURL=lottery_VideoPlayView.js.map
        