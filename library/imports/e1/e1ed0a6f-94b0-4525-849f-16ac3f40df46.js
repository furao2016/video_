"use strict";
cc._RF.push(module, 'e1ed0pvlLBFJYSfFqw/QN9G', 'lottery_viewCtrBase');
// Scripts/UI/lottery_viewCtrBase.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("../Singleton/SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_GlobalMsg = require("../Core/Event/lottery_GlobalMsg");

var _lottery_GlobalMsg2 = _interopRequireDefault(_lottery_GlobalMsg);

var _lottery_viewComponentManager = require("../Manager/lottery_viewComponentManager");

var _lottery_viewComponentManager2 = _interopRequireDefault(_lottery_viewComponentManager);

var _lottery_viewCtrManager = require("../Manager/lottery_viewCtrManager");

var _lottery_viewCtrManager2 = _interopRequireDefault(_lottery_viewCtrManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("ProjectEnum"),
    moduleEnum = _require.moduleEnum;

var ViewCtrBase = function (_SingletonBase) {
    _inherits(ViewCtrBase, _SingletonBase);

    function ViewCtrBase() {
        _classCallCheck(this, ViewCtrBase);

        var _this = _possibleConstructorReturn(this, (ViewCtrBase.__proto__ || Object.getPrototypeOf(ViewCtrBase)).call(this));

        _this.ModuleStatus = cc.Enum({
            none: 0,
            init: 1,
            close: 2,
            open: 3
        });
        _this.moduleName = "";
        _this.curModuleStatus = 0;
        _this.openStatus = moduleEnum.None;
        _this.viewNode = "";
        return _this;
    }

    /**
     * 创建实例的静态回调方法。由子类重写，并返回具体类型的对象
     */


    _createClass(ViewCtrBase, [{
        key: "_onDestroyObject",

        /**重写父类的销毁函数*/
        value: function _onDestroyObject() {
            this.Destroy();
        }
        /*-----------------------------生命周期函数-------------------------------*/

    }, {
        key: "Init",
        value: function Init() {
            if (this.curModuleStatus >= this.ModuleStatus.init) return;
            this.curModuleStatus = this.ModuleStatus.init;
            this.AddEvent();
            this.OnInit();
            _lottery_viewCtrManager2.default.getInstance().AddViewCtr(this);
        }
    }, {
        key: "Open",
        value: function Open() {
            var _this2 = this;

            if (this.curModuleStatus === this.ModuleStatus.open) return;
            this.curModuleStatus = this.ModuleStatus.open;
            _lottery_viewCtrManager2.default.getInstance().OpenViewCtr(this);
            _lottery_viewComponentManager2.default.getInstance().Open(this.moduleName, function (script) {
                _this2.viewNode = script.node;
                _this2.OnOpen();
            });
        }
    }, {
        key: "Close",
        value: function Close() {
            if (this.curModuleStatus !== this.ModuleStatus.open) return;
            if (this.curModuleStatus === this.ModuleStatus.close) return;
            this.curModuleStatus = this.ModuleStatus.close;
            _lottery_viewCtrManager2.default.getInstance().CloseViewCtr(this);
            _lottery_viewComponentManager2.default.getInstance().Close(this.moduleName);
            this.OnClose();
        }
    }, {
        key: "Destroy",
        value: function Destroy() {
            if (this.curModuleStatus === this.ModuleStatus.none) return;
            this.curModuleStatus = this.ModuleStatus.none;
            this.RemoveEvent();
            _lottery_viewCtrManager2.default.getInstance().RemoveViewCtr(this);
            this.OnDestroy();
        }
        /**数据处理*/

    }, {
        key: "OnMessageHandle",
        value: function OnMessageHandle(data) {
            var _data = this._OnMessageHandle(data);
            if (this.curModuleStatus === this.ModuleStatus.open) //只有在该模块是被打开的状态下才推送数据
                _lottery_GlobalMsg2.default.getInstance().Send(this.moduleName, _data);
        }
        /**
         * 获取view层节点
         */

    }, {
        key: "getViewNode",
        value: function getViewNode() {
            return this.viewNode;
        }
        /**
         * 显示view层节点
         */

    }, {
        key: "showViewNode",
        value: function showViewNode() {
            this.viewNode && (this.viewNode.active = true);
        }
        /**
         * 隐藏view层节点
         */

    }, {
        key: "hideViewNode",
        value: function hideViewNode() {
            this.viewNode && (this.viewNode.active = false);
        }
        /*----------------------子类重写方法-----------------------*/
        /**添加监听 */

    }, {
        key: "AddEvent",
        value: function AddEvent() {}
        /*
        TODO:向数据层/数据控制层注册监听
        */

        /**取消监听 */

    }, {
        key: "RemoveEvent",
        value: function RemoveEvent() {
            /*
            TODO:讲注册在数据层/数据控制层的监听去掉
            */
        }
    }, {
        key: "_OnMessageHandle",
        value: function _OnMessageHandle(data) {
            var _data = data;
            /**
             * TODO:处理消息然后返回给OnMessageHandle 往view层发送
             */
            return _date;
        }
    }, {
        key: "OnInit",
        value: function OnInit() {}
    }, {
        key: "OnOpen",
        value: function OnOpen() {}
    }, {
        key: "OnClose",
        value: function OnClose() {}
    }, {
        key: "OnDestroy",
        value: function OnDestroy() {}
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new ViewCtrBase();
        }
    }]);

    return ViewCtrBase;
}(_SingletonBase3.default);

exports.default = ViewCtrBase;
module.exports = exports["default"];

cc._RF.pop();