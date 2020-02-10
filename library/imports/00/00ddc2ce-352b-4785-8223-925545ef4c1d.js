"use strict";
cc._RF.push(module, '00ddcLONStHhYIjklVF70wd', 'lottery_BaseSocket');
// Scripts/Core/Net/lottery_BaseSocket.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketEnum = require("lottery_SocketEnum");

var simplewebsocket = function () {
    function simplewebsocket() {
        _classCallCheck(this, simplewebsocket);

        this._wb_client = null;
        this._host = "";
        this._port = "";
        this._attachParam = "";
        this._cacheMsg = [];
        this._is_opened = false;
        this._onMessageCallback = null;
        this._onConnectCallback = null;
    } //附带参数
    //消息接受派发回调函数。socketmanager会注册 然后在manager里面去做派发


    _createClass(simplewebsocket, [{
        key: "init",
        //建立链接的回调函数。socketmanager会注册，然后在manager里面处理逻辑

        value: function init(host, port, param) {
            try {
                this._is_opened = false;
                this._host = host || this._host;
                this._port = port || this._port;
                this._attachParam = param || this._attachParam || "";
                this.connect();
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
    }, {
        key: "connect",
        value: function connect() {
            try {
                this._is_opened = false;
                var url = "ws://" + this._host + ":" + this._port + "/socket/video/" + this._attachParam;
                this._wb_client = new WebSocket(url);
                this._wb_client.onopen = this.onOpen.bind(this);
                this._wb_client.onmessage = this.onMessage.bind(this);
                this._wb_client.onerror = this.onError.bind(this);
                this._wb_client.onclose = this.onClose.bind(this);
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
    }, {
        key: "onOpen",
        value: function onOpen(e) {
            try {
                this._is_opened = true;
                for (var index = 0; index < this._cacheMsg.length; index++) {
                    var data = this._cacheMsg[index];
                    this.send(data);
                }
                this._cacheMsg = [];

                if (this._onConnectCallback) {
                    this._onConnectCallback(SocketEnum.success);
                }
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
    }, {
        key: "send",
        value: function send(data) {
            try {
                if (this._is_opened && this._wb_client.readyState === 1) {
                    this._wb_client.send(data);
                } else {
                    this._cacheMsg.push(data);
                }
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
    }, {
        key: "onError",
        value: function onError(e) {
            try {
                this._is_opened = false;
                if (this._onConnectCallback) {
                    this._onConnectCallback(SocketEnum.error);
                }
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
    }, {
        key: "onMessage",
        value: function onMessage(message) {
            if (this._onMessageCallback) this._onMessageCallback(message);
        }
    }, {
        key: "onClose",
        value: function onClose(e) {
            if (this._onConnectCallback) {
                this._onConnectCallback(SocketEnum.close);
            }
        }
        /**
         * 主动关闭;
         */

    }, {
        key: "close",
        value: function close() {
            try {
                if (this._is_opened) {
                    this._is_opened = false;
                    //清空onclose主动回调的原因是因为要兼容浏览器bug
                    //在主动断开链接之后浏览器可能很晚很晚才能回调onclose
                    //结果导致再次链接的时候反而处理不正确了
                    this._wb_client.onclose = null;
                    this._wb_client.onmessage = null;
                    this._wb_client.onopen = null;
                    this._wb_client.onerror = null;
                    this._wb_client.close(1000);
                    this._wb_client = null;
                }
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
        /**
         * 注册消息派发函数
         * @param {*} callback 
         */

    }, {
        key: "RegestMessageEvent",
        value: function RegestMessageEvent(callback) {
            this._onMessageCallback = callback;
        }
        /**
         * 连接状态改变回掉函数
         * @param {*} callback 
         */

    }, {
        key: "RegisterConnectEvent",
        value: function RegisterConnectEvent(callback) {
            this._onConnectCallback = callback;
        }
    }]);

    return simplewebsocket;
}();

exports.default = simplewebsocket;
module.exports = exports["default"];

cc._RF.pop();