"use strict";
cc._RF.push(module, 'f66096bEQRH5JfPsMdzxTeL', 'lottery_VideoSysView');
// Scripts/UI/view_videoSys/lottery_VideoSysView.js

'use strict';

var _lottery_MsgStation = require('../../Data/lottery_MsgStation');

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

var _lottery_videoFlow = require('./lottery_videoFlow');

var _lottery_videoFlow2 = _interopRequireDefault(_lottery_videoFlow);

var _lottery_VideoSysCtr = require('./lottery_VideoSysCtr');

var _lottery_VideoSysCtr2 = _interopRequireDefault(_lottery_VideoSysCtr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: require("lottery_viewBaseComponent"),
    properties: {
        tips: [cc.Node],
        bg: cc.Node,
        backBtn: cc.Node, //返回按钮
        videoFlow: _lottery_videoFlow2.default
    },
    /*------------------子类重写函数---------------*/
    OnInit: function OnInit() {
        this.moduleName = "videoSysPre";
    },
    OnShow: function OnShow() {
        _lottery_MsgStation2.default.getInstance().onSendLinkHeGuan();
    },
    onEnable: function onEnable() {
        this.backBtn.on(cc.Node.EventType.TOUCH_END, this.backBtnDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },
    onDisable: function onDisable() {
        this.backBtn.off(cc.Node.EventType.TOUCH_END, this.backBtnDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.escEvent, this);
    },
    OnHide: function OnHide() {},
    OnDispose: function OnDispose() {},
    _onMessageHandel: function _onMessageHandel(data) {
        switch (data.type) {
            case 1:
                //链接荷官端提示
                this.tips[0].active = true;
                this.tips[1].active = false;
                this.tips[2].active = false;
                this.backBtn.active = true;
                break;
            case 2:
                //链接成功提示
                this.tips[0].active = false;
                this.tips[1].active = true;
                this.tips[2].active = false;
                setTimeout(function () {
                    _lottery_VideoSysCtr2.default.getInstance().OnMessageHandle({ type: 4 });
                }, 500);
                break;
            case 3:
                //连接失败
                this.tips[0].active = false;
                this.tips[1].active = false;
                this.tips[2].active = true;
                break;
            case 4:
                //开启视频流程
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
    backBtnDown: function backBtnDown() {
        _lottery_MsgStation2.default.getInstance().onBackToSys();
    },
    escEvent: function escEvent(event) {
        switch (event.keyCode) {
            case cc.KEY.escape:
                console.log("退出事件");
                this.videoFlow.stopPlay();
                this.backBtnDown();
                break;
        }
    }
});

cc._RF.pop();