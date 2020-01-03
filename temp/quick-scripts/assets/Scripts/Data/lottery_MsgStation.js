(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Data/lottery_MsgStation.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3b143SzPsNCcJ/WU7ozXQgC', 'lottery_MsgStation', __filename);
// Scripts/Data/lottery_MsgStation.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.simulationAward = simulationAward;

var _SingletonBase2 = require("../Singleton/SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_NetManager = require("../Manager/lottery_NetManager");

var _lottery_NetManager2 = _interopRequireDefault(_lottery_NetManager);

var _lottery_SocketManager = require("../Manager/lottery_SocketManager");

var _lottery_SocketManager2 = _interopRequireDefault(_lottery_SocketManager);

var _lottery_lotteryData = require("./lottery_lotteryData");

var _lottery_lotteryData2 = _interopRequireDefault(_lottery_lotteryData);

var _lottery_SockMsgDefine = require("../Manager/lottery_SockMsgDefine");

var _lottery_SockMsgDefine2 = _interopRequireDefault(_lottery_SockMsgDefine);

var _lottery_GlobalMsg = require("../Core/Event/lottery_GlobalMsg");

var _lottery_GlobalMsg2 = _interopRequireDefault(_lottery_GlobalMsg);

var _lottery_EventDefine = require("./lottery_EventDefine");

var _lottery_helper = require("../UI/tools/lottery_helper");

var _lottery_helper2 = _interopRequireDefault(_lottery_helper);

var _lottery_VideoSysCtr = require("../UI/view_videoSys/lottery_VideoSysCtr");

var _lottery_VideoSysCtr2 = _interopRequireDefault(_lottery_VideoSysCtr);

var _lottery_loginViewCtr = require("../UI/view_login/lottery_loginViewCtr");

var _lottery_loginViewCtr2 = _interopRequireDefault(_lottery_loginViewCtr);

var _lottery_VideoPlayCtr = require("../UI/view_videoPlay/lottery_VideoPlayCtr");

var _lottery_VideoPlayCtr2 = _interopRequireDefault(_lottery_VideoPlayCtr);

var _videoMsgFactory = require("../UI/view_videoSys/videoMsgFactory");

var _videoMsgFactory2 = _interopRequireDefault(_videoMsgFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 消息中转
 */
var lottery_MsgStation = function (_SingletonBase) {
    _inherits(lottery_MsgStation, _SingletonBase);

    function lottery_MsgStation() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_MsgStation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_MsgStation.__proto__ || Object.getPrototypeOf(lottery_MsgStation)).call.apply(_ref, [this].concat(args))), _this), _this.httpServer = "", _this.socketIP = "", _this.socketPort = "", _this.loging = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(lottery_MsgStation, [{
        key: "noticeInit",

        /**
         * ws消息初始化
         */
        value: function noticeInit() {
            var socket = _lottery_SocketManager2.default.getInstance();
            socket.On(_lottery_SockMsgDefine2.default.DOWN.SC_OK, this.socketConnect, this);
            socket.On(_lottery_SockMsgDefine2.default.DOWN.SC_VideoMsg, this.videoMsg, this);
            socket.On(_lottery_SockMsgDefine2.default.DOWN.SC_KaiPan, this.lotteryOpeningOrClosed, this);
            socket.On(_lottery_SockMsgDefine2.default.DOWN.SC_JianQi, this.setJianQi, this);
            socket.On(_lottery_SockMsgDefine2.default.DOWN.SC_JIANQIU, this.lotteryResults, this);
        }
        /**
         * 系统消息初始化
         */

    }, {
        key: "sysEventInit",
        value: function sysEventInit() {
            _lottery_GlobalMsg2.default.getInstance().Register(_lottery_EventDefine.lottery_EventDefine.sys.loadingOvertime, this.loadingOvertime);
        }

        /*----------------------------------------------本地事件------------------------------------------------*/
        /**
        * 登录
        */

    }, {
        key: "onSendEnterLogin",
        value: function onSendEnterLogin(account, password) {
            _lottery_helper2.default.getInstance().showLoading();
            _lottery_NetManager2.default.getInstance().HttpPost(this.httpServer + 'dealer/login/video/check', { "userName": account, "password": password }, function (error, msg) {
                _lottery_helper2.default.getInstance().showLoading(false);
                if (error) {
                    _lottery_helper2.default.getInstance().showTips('网络错误');
                    return;
                }
                switch (msg.code) {
                    case 1:
                        _lottery_lotteryData2.default.getInstance().updataData(msg.data);
                        _lottery_loginViewCtr2.default.getInstance().OnMessageHandle({ type: 1, data: _lottery_lotteryData2.default.getInstance().roleList });
                        break;
                    case 0:
                        _lottery_helper2.default.getInstance().showTips('检查下服务器');
                        break;
                    default:
                        _lottery_helper2.default.getInstance().showTips('密码或者账号错误');
                        break;
                }
            });
        }

        /**
         *根据彩种登陆
         */

    }, {
        key: "onSendLotteryChoice",
        value: function onSendLotteryChoice(lotteryCode) {
            _lottery_lotteryData2.default.getInstance().lotteryCode = lotteryCode;
            _lottery_loginViewCtr2.default.getInstance().Close();
            _lottery_VideoPlayCtr2.default.getInstance().Open();
        }

        /**
         * 链接荷官端
         */

    }, {
        key: "onSendLinkHeGuan",
        value: function onSendLinkHeGuan() {
            _lottery_helper2.default.getInstance().showLoading();
            _lottery_SocketManager2.default.getInstance().Connect(this.socketIP, this.socketPort, _lottery_lotteryData2.default.getInstance().userId); //与服务器建立长连接
            _lottery_VideoSysCtr2.default.getInstance().OnMessageHandle({ type: 1 });
        }

        /**
         * 荷官端链接成功准备播放视频
         */

    }, {
        key: "onSendLinkHeGuanSuccess",
        value: function onSendLinkHeGuanSuccess() {
            _lottery_helper2.default.getInstance().showLoading(false);
            _lottery_VideoSysCtr2.default.getInstance().OnMessageHandle({ type: 2 });
        }
        /**
         * 切换到全屏播放
         */

    }, {
        key: "onFullPlay",
        value: function onFullPlay() {
            _lottery_VideoPlayCtr2.default.getInstance().Close();
            _lottery_VideoSysCtr2.default.getInstance().Open();
            //切换到全屏
            screenfull.request(document.getElementById('Cocos2dGameContainer'));
        }
        /**
         * 回到系统
         */

    }, {
        key: "onBackToSys",
        value: function onBackToSys() {
            _lottery_helper2.default.getInstance().showLoading(false);
            _lottery_VideoPlayCtr2.default.getInstance().Open();
            _lottery_VideoSysCtr2.default.getInstance().Close();
        }
        /**
        * 退出
        */

    }, {
        key: "onSendLogoutContent",
        value: function onSendLogoutContent() {
            _lottery_SocketManager2.default.getInstance().close();
            _lottery_VideoPlayCtr2.default.getInstance().Close();
            _lottery_loginViewCtr2.default.getInstance().Open();
        }
        /*------------------------------------------socket回调--------------------------------------*/
        //建立长连接成功

    }, {
        key: "socketConnect",
        value: function socketConnect(data) {
            _lottery_helper2.default.getInstance().showLoading(false);
            var one = {
                'codeBack': 2020,
                'data': {
                    'lotteryCode': _lottery_lotteryData2.default.getInstance().lotteryCode
                }
            };
            _lottery_SocketManager2.default.getInstance().Send(JSON.stringify(one));
        }

        //链接何荷官端后得回调

    }, {
        key: "videoMsg",
        value: function videoMsg(data) {
            if (data == 1) _lottery_VideoSysCtr2.default.getInstance().OnMessageHandle({ type: 2 });else if (data == 0) _lottery_VideoSysCtr2.default.getInstance().OnMessageHandle({ type: 3 });
        }
        //接收到开封盘命令

    }, {
        key: "lotteryOpeningOrClosed",
        value: function lotteryOpeningOrClosed(data) {
            if (data == 0) {
                _videoMsgFactory2.default.ins().changePeriod(-1);
            } else {
                _videoMsgFactory2.default.ins().changePeriod(1);
            }
        }
        //设置奖期

    }, {
        key: "setJianQi",
        value: function setJianQi(data) {
            var expect = data.expect; //当前期号
            var next = data.nestExpect;
            console.log(data);
        }

        //接收到当前期售彩结束准备开奖,?第一期 马上跳播

    }, {
        key: "lotteryOpenAward",
        value: function lotteryOpenAward() {
            _videoMsgFactory2.default.ins().changePeriod(0);
            cc.systemEvent.emit(_lottery_EventDefine.lottery_EventDefine.VIDEOFLOW.RESTART);
        }
        //接收到当前期播放倒计时

    }, {
        key: "lotteryReadyAward",
        value: function lotteryReadyAward(data) {
            _videoMsgFactory2.default.ins().countDownTime = data;
        }
        //接收到开奖结果

    }, {
        key: "lotteryResults",
        value: function lotteryResults(data) {
            console.log(data);
            cc.systemEvent.emit(_lottery_EventDefine.lottery_EventDefine.VIDEOFLOW.BALLINFO, data);
        }
        /*-----------------------------------------系统事件回调-----------------------------------------*/

    }, {
        key: "loadingOvertime",
        value: function loadingOvertime() {
            console.log("加载超时");
        }
    }], [{
        key: "_onNewObject",
        //登陆中

        value: function _onNewObject() {
            var one = new lottery_MsgStation();
            one.noticeInit();
            one.sysEventInit();
            return one;
        }
    }]);

    return lottery_MsgStation;
}(_SingletonBase3.default);

exports.default = lottery_MsgStation;
function simulationAward() {
    var one = 0;
    setTimeout(function () {
        _lottery_VideoSysCtr2.default.getInstance().OnMessageHandle({ type: 4 });
        setTimeout(function () {
            lottery_MsgStation.getInstance().lotteryOpenAward();
            lottery_MsgStation.getInstance().lotteryReadyAward(7);
        }, 0);
    }, 5000);
}

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
        //# sourceMappingURL=lottery_MsgStation.js.map
        