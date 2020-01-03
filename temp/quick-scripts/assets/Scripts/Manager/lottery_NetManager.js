(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Manager/lottery_NetManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '40803HW+gtHOLqXquc0cFQO', 'lottery_NetManager', __filename);
// Scripts/Manager/lottery_NetManager.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require('SingletonBase');

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_RunInBackground = require('lottery_RunInBackground');

var _lottery_RunInBackground2 = _interopRequireDefault(_lottery_RunInBackground);

var _lottery_BaseUrlLoad = require('lottery_BaseUrlLoad');

var _lottery_BaseUrlLoad2 = _interopRequireDefault(_lottery_BaseUrlLoad);

var _lottery_HttpUtils = require('lottery_HttpUtils');

var _lottery_HttpUtils2 = _interopRequireDefault(_lottery_HttpUtils);

var _lottery_TimeMgr = require('lottery_TimeMgr');

var _lottery_TimeMgr2 = _interopRequireDefault(_lottery_TimeMgr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
网络管理脚本
*/
var httpServer = "";
var urlServer = "";
var token = void 0;

var NetManager = function (_SingletonBase) {
    _inherits(NetManager, _SingletonBase);

    //服务器时间更新事件组
    /*
    http请求存储数组
    [0]={url:"http://192.168.0.0/xxxx/xx/xx....",params}
    */
    //服务器当前时间戳，本地做自增处理，不定时和服务器对比一次
    function NetManager() {
        _classCallCheck(this, NetManager);

        var _this = _possibleConstructorReturn(this, (NetManager.__proto__ || Object.getPrototypeOf(NetManager)).call(this));

        _this.curServerTimeStamp = 0;
        _this.changeServerTimerID = 0;
        _this.serverTimeChangeEvent = {};
        _this.httpPostList = [];
        _this.openHttpPost = false;
        _this.showTipsFunc = null;
        _this.hideTipsFunc = null;
        return _this;
    }

    _createClass(NetManager, [{
        key: 'RunInBackground',

        /**
         * 切换后台回调函数
         * @param {*} focus true 从后台切回来  false 切到后台
         */
        value: function RunInBackground(focus) {
            if (focus) {//重新回到界面
                // this.HttpPost("lobby/validate/getTime", {}, function () { });   
            }
        }
    }, {
        key: 'HttpPostFunc',
        value: function HttpPostFunc() {
            var self = this;
            var item = this.httpPostList[0];
            var endfunc = function endfunc() {
                self.httpPostList.splice(0, 1);
                self.hideTipsFunc && self.hideTipsFunc();
                if (self.httpPostList.length <= 0) {
                    self.openHttpPost = false;
                } else {
                    self.HttpPostFunc();
                }
            };
            _lottery_HttpUtils2.default.getInstance().httpPost(httpServer + item.url, item.params, function (data) {
                var err = null;
                if (data.state == 1) err = data.errorMessage;
                if (data.thisTime) self.FreshServerTimeStamp(data.thisTime);
                token = data.token || data.logintoken || token;
                item.callback(err, data);
                endfunc.call(this);
            }.bind(this), function (fail, url) {
                item.showErrorTips && this.ShowErrorTips();
                item.callback("error", null);
                endfunc.call(this);
            }.bind(this));
        }
    }, {
        key: 'ShowErrorTips',
        value: function ShowErrorTips() {
            /*
            TODO:弹出网络连接错误的提示框，
            */
        }
    }, {
        key: 'AddServerTime',
        value: function AddServerTime() {
            this.curServerTimeStamp += 1;
            for (var key in this.serverTimeChangeEvent) {
                var element = this.serverTimeChangeEvent[key];
                element(this.curServerTimeStamp);
            }
        }
        /*
        刷新服务器时间戳 毫秒
        */

    }, {
        key: 'FreshServerTimeStamp',
        value: function FreshServerTimeStamp(thistime) {
            this.curServerTimeStamp = Math.floor(thistime / 1000);
            var delay = thistime % 1000;
            delay = 1 - delay / 1000.0;
            if (this.changeServerTimerID !== 0) {
                _lottery_TimeMgr2.default.getInstance().closeTimer(this.changeServerTimerID);
                this.changeServerTimerID = 0;
            }
            this.changeServerTimerID = _lottery_TimeMgr2.default.getInstance().openTimer(this.AddServerTime, 1, 0, delay, this);
        }
        /*-----------------------------对外接口---------------------------------------*/
        /**初始化链接数据 */

    }, {
        key: 'InitUrl',
        value: function InitUrl(http, url) {
            // httpServer = http;
            // urlServer = url;
            _lottery_RunInBackground2.default.getInstance().RegestRunInBackground("NetManager", this.RunInBackground, this); //注册网页回调函数
        }
        /*
        和http服务器进行通信
        url 地址,不包含 ip和端口 eg.   http://192.168.0.185:7090/user/login    url = user/login
        params 参数 {键值对}
        callback 回调函数 参数 (err,obj)
        */

    }, {
        key: 'HttpPost',
        value: function HttpPost(url, params, callback) {
            var showErrorTips = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


            if (!params.token || params.token == "") {
                // params.token = token;
            } else {
                token = params.token;
            }

            var item = {
                "url": url,
                "params": params,
                "callback": callback,
                "showErrorTips": showErrorTips
            };
            this.httpPostList.push(item);
            this.showTipsFunc && this.showTipsFunc();
            if (!this.openHttpPost) {
                this.openHttpPost = true;
                this.HttpPostFunc();
            }
        }
    }, {
        key: 'AjaxGet',
        value: function AjaxGet(url, succ, fail, type, data) {
            _lottery_HttpUtils2.default.getInstance().ajaxGet(url, succ, fail, type, data);
        }
        /**
         * 绑定服务器时间刷新事件
         * @param {*} tag 绑定事件的唯一标识
         * @param {*} callback 回调方法
         * @param {*} self 回调方法作用域
         */

    }, {
        key: 'RegestServerTimeChangeEvent',
        value: function RegestServerTimeChangeEvent(tag, callback, self) {
            callback = self ? callback.bind(self) : callback;
            this.serverTimeChangeEvent[tag] = callback;
            callback(this.curServerTimeStamp);
        }
        /**
         * 解除绑定
         * @param {*} tag 绑定事件的唯一标识
         */

    }, {
        key: 'UnRegestServerTimeChangeEvent',
        value: function UnRegestServerTimeChangeEvent(tag) {
            if (this.serverTimeChangeEvent[tag]) delete this.serverTimeChangeEvent[tag];
        }
        /**
         * 从服务器下载资源
         * @param {*} key 下载资源的唯一key
         * @param {*} url 资源路径
         * @param {*} suffix 资源后缀(类型 eg.    png   txt   jpg etc.)
         * @param {*} callback 回调方法
         */

    }, {
        key: 'LoadUrl',
        value: function LoadUrl(key, url, suffix, callback) {
            _lottery_BaseUrlLoad2.default.getInstance().LoadUrl(key, urlServer + url, suffix, callback);
        }
    }, {
        key: 'SetShowWaitPanelFunc',
        value: function SetShowWaitPanelFunc(func) {
            this.showTipsFunc = func;
        }
    }, {
        key: 'SetHideWaitPanelFunc',
        value: function SetHideWaitPanelFunc(func) {
            this.hideTipsFunc = func;
        }
    }], [{
        key: '_onNewObject',
        value: function _onNewObject() {
            return new NetManager();
        }
    }]);

    return NetManager;
}(_SingletonBase3.default);

exports.default = NetManager;
module.exports = exports['default'];

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
        //# sourceMappingURL=lottery_NetManager.js.map
        