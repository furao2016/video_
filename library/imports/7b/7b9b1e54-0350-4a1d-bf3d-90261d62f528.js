"use strict";
cc._RF.push(module, '7b9b15UA1BKHb89kCYdYvUo', 'lottery_BaseResLoad');
// Scripts/Core/ResHandle/lottery_BaseResLoad.js

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

/**
 * 基础资源加载类
 * 
 * 缺乏制定文件夹扫描加载
 */

var BaseResLoad = function (_SingletonBase) {
    _inherits(BaseResLoad, _SingletonBase);

    function BaseResLoad() {
        _classCallCheck(this, BaseResLoad);

        var _this = _possibleConstructorReturn(this, (BaseResLoad.__proto__ || Object.getPrototypeOf(BaseResLoad)).call(this));

        _this.WaitList = [];
        _this.DoneList = [];
        _this.KeyList = [];
        _this.keyDic = {};
        _this.ProgressList = [];
        _this.TypeList = [];
        _this.CurDownloadKey = null;
        _this.IsLoading = false;
        return _this;
    }

    _createClass(BaseResLoad, [{
        key: "_onDestroyObject",
        value: function _onDestroyObject() {
            this.IsLoading = false;
            this.KeyList = [];
            this.keyDic = {};
            this.WaitList = [];
            this.DoneList = [];
            this.ProgressList = [];
            this.TypeList = [];
        }
    }, {
        key: "DownloadRes",
        value: function DownloadRes() {
            if (this.KeyList.length <= 0) {
                //下载完成
                this.IsLoading = false;
            } else {
                //数组中要下载的列表还有
                //当前下载的资源完成
                if (this.CurDownloadKey == null || this.CurDownloadKey == "undefined") {
                    this.CurDownloadKey = this.KeyList[0]; //获取第一个key
                    var self = this;
                    this.IsLoading = true;
                    var downFunc = function downFunc(err, obj) {
                        var deleteFunc = function deleteFunc() {
                            //删除KeyList中的第一个数据
                            self.KeyList.shift();
                            //删除等待列表中的key
                            delete self.WaitList[self.CurDownloadKey];
                            delete self.DoneList[self.CurDownloadKey];
                            delete self.TypeList[self.CurDownloadKey];
                            delete self.ProgressList[self.CurDownloadKey];
                            delete self.keyDic[self.CurDownloadKey];
                        };
                        if (!err) {
                            //下载完成，
                            //将下载好的图片回调给传入的函数
                            if (self.DoneList[self.CurDownloadKey] != null && self.DoneList[self.CurDownloadKey] != "undefined") {
                                self.DoneList[self.CurDownloadKey](err, obj, self.CurDownloadKey);
                            }
                        } else {
                            cc.error("当前下载失败，开始下一个" + err);
                        };
                        deleteFunc();
                        self.CurDownloadKey = null;
                        self.CheckUpdate();
                    };
                    if (this.TypeList[this.CurDownloadKey] && !this.ProgressList[this.CurDownloadKey]) cc.loader.loadRes(this.WaitList[this.CurDownloadKey], this.TypeList[this.CurDownloadKey], downFunc);else if (!this.TypeList[this.CurDownloadKey] && this.ProgressList[this.CurDownloadKey]) cc.loader.loadRes(this.WaitList[this.CurDownloadKey], this.ProgressList[this.CurDownloadKey], downFunc);else if (!this.TypeList[this.CurDownloadKey] && !this.ProgressList[this.CurDownloadKey]) cc.loader.loadRes(this.WaitList[this.CurDownloadKey], downFunc);else cc.loader.loadRes(this.WaitList[this.CurDownloadKey], this.TypeList[this.CurDownloadKey], this.ProgressList[this.CurDownloadKey], downFunc);
                } else {
                    //当前下载的未完成，继续等待完成
                    cc.error("当前下载的未完成，继续等待完成");
                }
            }
        }
    }, {
        key: "CheckUpdate",
        value: function CheckUpdate() {
            if (this.KeyList.length > 0) {
                //获取最后一个， 然后开始下载
                this.DownloadRes();
            } else {
                this.IsLoading = false;
            }
        }

        /*------------------------------对外接口---------------------------------*/
        /**
         * 根据key和路径有序加载
         * 加载Atlas资源的时候需要传入mtype = cc.SpriteAtlas
         */

    }, {
        key: "LoadByKey",
        value: function LoadByKey(key, url, callback) {
            var mtype = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var progress = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

            if (this.keyDic[key]) return;

            var obj;
            if (mtype) obj = cc.loader.getRes(url, mtype);else obj = cc.loader.getRes(url);
            if (obj) {
                callback(null, obj, key);
                return;
            }

            this.keyDic[key] = true;
            this.KeyList.push(key);
            this.WaitList[key] = url;
            this.DoneList[key] = callback;
            if (mtype) this.TypeList[key] = mtype;
            if (progress) this.ProgressList[key] = progress;
            if (this.IsLoading == false) {
                //开始下载
                this.DownloadRes();
            }
            return null;
        }
    }, {
        key: "LoadResDir",
        value: function LoadResDir(url, progress, callback) {
            cc.loader.loadResDir(url, progress, callback);
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new BaseResLoad();
        }
    }]);

    return BaseResLoad;
}(_SingletonBase3.default);

exports.default = BaseResLoad;
module.exports = exports["default"];

cc._RF.pop();