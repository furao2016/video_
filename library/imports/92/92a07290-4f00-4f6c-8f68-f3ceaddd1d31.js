"use strict";
cc._RF.push(module, '92a07KQTwBPbI9o886t3R0x', 'lottery_BaseUrlLoad');
// Scripts/Core/ResHandle/lottery_BaseUrlLoad.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("../../Singleton/SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseUrlLoad = function (_SingletonBase) {
    _inherits(BaseUrlLoad, _SingletonBase);

    function BaseUrlLoad() {
        _classCallCheck(this, BaseUrlLoad);

        var _this = _possibleConstructorReturn(this, (BaseUrlLoad.__proto__ || Object.getPrototypeOf(BaseUrlLoad)).call(this));

        _this.keyList = [];
        _this.urlList = [];
        _this.callbackList = [];
        _this.suffixList = [];
        _this.curKey = "";
        _this.curUrl = "";
        _this.curCallback = null;
        _this.curSuffix = "";
        _this.isLoading = false;
        return _this;
    }

    _createClass(BaseUrlLoad, [{
        key: "LoadUrl",

        /**
        从远程服务器获取资源
        @param url 远程下载链接
        @param suffix 资源类型 通常是填后缀，eg.  png txt jpg...
        @param callback 下载完成回掉函数 
        */
        value: function LoadUrl(key, url, suffix, callback) {
            this.keyList.push(key);
            this.urlList.push(url);
            this.suffixList.push(suffix);
            this.callbackList.push(callback);
            this.load();
        }
        /*--------------------------------------内部私有方法------------------------------------- */

    }, {
        key: "loadHead",
        value: function loadHead() {
            this.isLoading = true;
            this.curKey = this.keyList.splice(0, 1)[0];
            this.curUrl = this.urlList.splice(0, 1)[0];
            this.curCallback = this.callbackList.splice(0, 1)[0];
            this.curSuffix = this.suffixList.splice(0, 1)[0];
            cc.loader.load({ "url": this.curUrl, "type": this.curSuffix }, this.loadCallback.bind(this));
        }
    }, {
        key: "load",
        value: function load() {
            if (this.isLoading) return;
            this.loadHead();
        }
    }, {
        key: "loadCallback",
        value: function loadCallback(err, data) {
            if (err) {//下载出错
            } else {}
            this.curCallback(err, data, this.curKey);
            if (this.urlList.length > 0) {
                this.loadHead();
            } else {
                this.isLoading = false;
            }
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new BaseUrlLoad();
        }
    }]);

    return BaseUrlLoad;
}(_SingletonBase3.default);

exports.default = BaseUrlLoad;
module.exports = exports["default"];

cc._RF.pop();