(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Singleton/SingletonBase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a21f1rcO7BFzo1H+EFHmE5v', 'SingletonBase', __filename);
// Scripts/Singleton/SingletonBase.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lottery_CoreMgr = require("../Core/lottery_CoreMgr");

var _lottery_CoreMgr2 = _interopRequireDefault(_lottery_CoreMgr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allowNew = false;
var SingletonBase = (_temp = _class = function () {
    function SingletonBase() {
        _classCallCheck(this, SingletonBase);

        if (!allowNew) throw new Error("Can't new on singleton!");
    }

    /**
     * 获取单例实例
     */


    _createClass(SingletonBase, [{
        key: "_onDestroyObject",


        /**
         * 实例方法。当单例对象被销毁时被调用的回调方法
         */
        value: function _onDestroyObject() {
            // here is your code...

            // 需要在结尾调用父类的此方法
            //super._onDestroyObject()
        }
    }], [{
        key: "getInstance",
        value: function getInstance() {
            if (!this._singleInstance) {
                allowNew = true;
                this._singleInstance = this._onNewObject();
                this._AddToCoreMgr();
                allowNew = false;
            }

            return this._singleInstance;
        }

        /**
         * 创建实例的静态回调方法。由子类重写，并返回具体类型的对象
         */

    }, {
        key: "_onNewObject",
        value: function _onNewObject() {
            throw new Error("must be implement!");
        }
        /**
         * 添加对象致CoreMgr管理类中去
         */

    }, {
        key: "_AddToCoreMgr",
        value: function _AddToCoreMgr() {
            _lottery_CoreMgr2.default.RegisterSingleton(this);
        }
    }, {
        key: "_doDestroyInstance",
        value: function _doDestroyInstance() {
            var ret = false;
            if (this._singleInstance) {
                ret = true;
                var instance = this._singleInstance;
                this._singleInstance = null;
                instance._onDestroyObject();
            }
            return ret;
        }
        /** 
         * 销毁对象的方法
         */

    }, {
        key: "destroyInstance",
        value: function destroyInstance() {
            return this._doDestroyInstance();
        }
    }]);

    return SingletonBase;
}(), _class._singleInstance = null, _class.lottery_CoreMgr = null, _temp);
exports.default = SingletonBase;
module.exports = exports["default"];

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
        //# sourceMappingURL=SingletonBase.js.map
        