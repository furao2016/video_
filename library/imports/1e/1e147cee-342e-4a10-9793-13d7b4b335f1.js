"use strict";
cc._RF.push(module, '1e147zuNC5KEJeTE9e0szXx', 'lottery_VideoPlayView');
// Scripts/UI/view_videoPlay/lottery_VideoPlayView.js

"use strict";

var _lottery_MsgStation = require("../../Data/lottery_MsgStation");

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

var _lottery_videoCom = require("../videoCom/lottery_videoCom");

var _lottery_videoCom2 = _interopRequireDefault(_lottery_videoCom);

var _lottery_lotteryData = require("../../Data/lottery_lotteryData");

var _lottery_lotteryData2 = _interopRequireDefault(_lottery_lotteryData);

var _lottery_EventDefine = require("../../Data/lottery_EventDefine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: require("lottery_viewBaseComponent"),
    properties: {
        exitBtn: cc.Node,
        videoPlayBtn: cc.Node,
        videoCanvas: [_lottery_videoCom2.default],
        inputEvents: cc.Node,
        bigCanvas: cc.Sprite,
        loadNodes: [cc.Node]
    },
    /*----------------------------------生命周期函数-----------------------------------------*/
    OnInit: function OnInit() {
        var _this = this;

        this.moduleName = "videoSysPre";

        var _loop = function _loop(node) {
            if (node) {
                node.stopAllActions();
                var callFunc = cc.callFunc(function () {
                    node.rotation += 30;
                    node.rotation %= 360;
                }.bind(_this));
                var repfor = cc.repeatForever(cc.sequence(cc.delayTime(0.1), callFunc));
                node.runAction(repfor);
            }
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.loadNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var node = _step.value;

                _loop(node);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        _lottery_MsgStation2.default.getInstance().getVideoUrl();
    },
    OnShow: function OnShow() {},
    onEnable: function onEnable() {
        this.exitBtn.on(cc.Node.EventType.TOUCH_END, this.exitBtnDown, this);
        this.videoPlayBtn.on(cc.Node.EventType.TOUCH_END, this.videoPlayBtnDown, this);
        cc.systemEvent.on(_lottery_EventDefine.lottery_EventDefine.URL_CHANGE, this.videoUrlChange, this);
    },
    onDisable: function onDisable() {
        this.exitBtn.off(cc.Node.EventType.TOUCH_END, this.exitBtnDown, this);
        this.videoPlayBtn.off(cc.Node.EventType.TOUCH_END, this.videoPlayBtnDown, this);
        cc.systemEvent.off(_lottery_EventDefine.lottery_EventDefine.URL_CHANGE, this.videoUrlChange, this);
    },
    OnHide: function OnHide() {},
    OnDispose: function OnDispose() {
        console.log('2222');
    },
    _onMessageHandel: function _onMessageHandel(data) {},

    /*--------------------------------------相关设置-----------------------------------------*/
    initVideo: function initVideo() {
        var videoUrl = ["ws://47.90.11.101:8081/lobbyB/L01", "ws://47.90.11.101:8081/lobbyB/L01-1"];
        this.videoCanvas.forEach(function (element, index) {
            element.setUrl(videoUrl[index]);
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
        if (_lottery_lotteryData2.default.getInstance().simulated) {
            (0, _lottery_MsgStation.simulationAward)();
        }
    },

    //地址更改
    videoUrlChange: function videoUrlChange() {
        var urls = _lottery_lotteryData2.default.getInstance().videoUrl;
        this.videoCanvas[0].setUrl(urls.master.HD);
        this.videoCanvas[1].setUrl(urls.vice.HD);
    },

    //小窗口全屏播放
    screenBtnDown: function screenBtnDown(event, data) {
        if (!this.videoCanvas[data].isPlay) return;
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