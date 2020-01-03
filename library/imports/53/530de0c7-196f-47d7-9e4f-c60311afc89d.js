"use strict";
cc._RF.push(module, '530deDHGW9H155PxgMRr8id', 'lottery_SocketManager');
// Scripts/Manager/lottery_SocketManager.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require('SingletonBase');

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_BaseSocket = require('lottery_BaseSocket');

var _lottery_BaseSocket2 = _interopRequireDefault(_lottery_BaseSocket);

var _lottery_TimeMgr = require('lottery_TimeMgr');

var _lottery_TimeMgr2 = _interopRequireDefault(_lottery_TimeMgr);

var _lottery_SockMsgDefine = require('lottery_SockMsgDefine');

var _lottery_SockMsgDefine2 = _interopRequireDefault(_lottery_SockMsgDefine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocketEnum = require("lottery_SocketEnum");
var ReConnectTimer = 5; //重连间隔时间 单位 秒


var socktIP = "192.168.0.158";
var socketPort = "7050";
var socketParam = "";

var SocketManager = function (_SingletonBase) {
    _inherits(SocketManager, _SingletonBase);

    //断线重连次数

    //当前socket状态
    //心跳包间隔时间 单位 秒
    function SocketManager() {
        _classCallCheck(this, SocketManager);

        var _this = _possibleConstructorReturn(this, (SocketManager.__proto__ || Object.getPrototypeOf(SocketManager)).call(this));

        _this.heartTime = 25;
        _this.heartTimerID = 0;
        _this.reConnectTimerID = 0;
        _this.isreconnect = false;
        _this.curSocketState = SocketEnum.none;
        _this.socketEventDic = {};
        _this.loadingShowFunc = null;
        _this.loadingHideFunc = null;
        _this.reConnectSocketNum = 0;
        return _this;
    } //心跳包计时器ID 


    _createClass(SocketManager, [{
        key: '_onDestroyObject',
        value: function _onDestroyObject() {
            if (this.curSocketState === SocketEnum.success) this.BaseSocketIns.close();
        }

        /**获取消息*/

    }, {
        key: 'OnMessage',
        value: function OnMessage(msg) {
            var data = null;
            if (msg.data) {
                data = JSON.parse(msg.data);
            }

            var msgId = data.codeBack;
            if (msgId != _lottery_SockMsgDefine2.default.UP.Heart) {//心跳包消息处理

            }
            if (data.code == 1) {
                //正确返回处理
                this.socketEventDic[msgId] && this.socketEventDic[msgId](data.data);
            } else if (data.code == 2) {//错误信息返回

            }
        }
        /**
         * 连接状态改变函数
         * @param {*} state 
         */

    }, {
        key: 'OnConnect',
        value: function OnConnect(state) {
            switch (state) {
                case SocketEnum.success:
                    //连接成功
                    this.loadingHideFunc && this.loadingHideFunc();
                    this.reConnectSocketNum = 0; //重连次数
                    this.isreconnect = false;
                    if (this.reConnectTimerID !== 0) {
                        _lottery_TimeMgr2.default.getInstance().closeTimer(this.reConnectTimerID);
                        this.reConnectTimerID = 0;
                    }
                    //this.HeartOpen();//开启心跳包
                    break;
                case SocketEnum.error:
                case SocketEnum.close:
                    //this.HeartClose();//关闭心跳包
                    this.socketEventDic[_lottery_SockMsgDefine2.default.LongConnect.Disconnect] && this.socketEventDic[_lottery_SockMsgDefine2.default.LongConnect.Disconnect]();
                    this.ReConnect(); //重连socket
                    break;
                default:
                    break;
            }
            this.curSocketState = state;
        }
        /**打开心跳包*/

    }, {
        key: 'HeartOpen',
        value: function HeartOpen() {
            var _this2 = this;

            this.HeartClose();
            this.heartTimerID = _lottery_TimeMgr2.default.getInstance().openTimer(function () {
                var msg = {};
                msg.codeBack = _lottery_SockMsgDefine2.default.UP.Heart;
                msg.data = {};
                _this2.Send(JSON.stringify(msg), false);
            }, this.heartTime, -1, this.heartTime);
        }
        /**关闭心跳包*/

    }, {
        key: 'HeartClose',
        value: function HeartClose() {
            if (this.heartTimerID !== 0) {
                _lottery_TimeMgr2.default.getInstance().closeTimer(this.heartTimerID);
            }
        }
        /**重连socket */

    }, {
        key: 'ReConnect',
        value: function ReConnect() {
            this.loadingShowFunc && this.loadingShowFunc();
            if (this.curSocketState == SocketEnum.success) this.BaseSocketIns.close();
            var func = function func() {
                this.reConnectSocketNum = this.reConnectSocketNum + 1;
                this.reConnectTimerID = 0;
                if (this.reConnectSocketNum >= 3) {
                    this.reConnectSocketNum = 0;
                    _lottery_TimeMgr2.default.getInstance().closeTimer(this.reConnectTimerID);
                    this.close();
                    return;
                }
                this.Connect(socktIP, socketPort, socketParam);
            };
            if (this.reConnectTimerID === 0) this.reConnectTimerID = _lottery_TimeMgr2.default.getInstance().openTimer(func.bind(this), 0, 1, ReConnectTimer);
        }
        /*--------------------------------------对外接口--------------------------------------*/
        /**连接*/

    }, {
        key: 'Connect',
        value: function Connect(ip, port, param) {
            socktIP = ip || socktIP;
            socketPort = port || socketPort;
            socketParam = param || socketParam;
            if (param && param != "") {
                this.BaseSocketIns.init(socktIP, socketPort, socketParam);
            } else {
                //TODO: 没有设定连接参数的提示代码
            }
        }
        /**发送数据  发送成功返回true，失败返回false*/

    }, {
        key: 'Send',
        value: function Send(data) {
            if (this.curSocketState && this.curSocketState != SocketEnum.success) {
                return false;
            }
            this.BaseSocketIns.send(data);
            return true;
        }
        /**事件注册 */

    }, {
        key: 'On',
        value: function On(id, callback, self) {
            this.socketEventDic[id] = self ? callback.bind(self) : callback;
        }
    }, {
        key: 'close',
        value: function close() {
            this.HeartClose();
            this.BaseSocketIns.close();
        }
    }, {
        key: 'SetLoadingShowAndHideFunc',
        value: function SetLoadingShowAndHideFunc(show, hide) {
            this.loadingShowFunc = show;
            this.loadingHideFunc = hide;
        }
    }], [{
        key: '_onNewObject',
        value: function _onNewObject() {
            var _instance = new SocketManager();
            _instance.BaseSocketIns = new _lottery_BaseSocket2.default();
            _instance.BaseSocketIns.RegestMessageEvent(_instance.OnMessage.bind(_instance));
            _instance.BaseSocketIns.RegisterConnectEvent(_instance.OnConnect.bind(_instance));
            return _instance;
        }
    }]);

    return SocketManager;
}(_SingletonBase3.default);

exports.default = SocketManager;
module.exports = exports['default'];

cc._RF.pop();