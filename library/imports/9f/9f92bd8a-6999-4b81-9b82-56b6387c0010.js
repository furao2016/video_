"use strict";
cc._RF.push(module, '9f92b2KaZlLgZuCVrY4fAAQ', 'lottery_viewCtrManager');
// Scripts/Manager/lottery_viewCtrManager.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("../Singleton/SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_viewComponentManager = require("./lottery_viewComponentManager");

var _lottery_viewComponentManager2 = _interopRequireDefault(_lottery_viewComponentManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("ProjectEnum"),
    moduleEnum = _require.moduleEnum;
/**界面模块管理类，出来模块与模块之间的关联 */


var ViewCtrManager = function (_SingletonBase) {
    _inherits(ViewCtrManager, _SingletonBase);

    function ViewCtrManager() {
        _classCallCheck(this, ViewCtrManager);

        var _this = _possibleConstructorReturn(this, (ViewCtrManager.__proto__ || Object.getPrototypeOf(ViewCtrManager)).call(this));

        _this.OpenModuleDic = {};
        _this.openModuleStack = [];

        _lottery_viewComponentManager2.default.getInstance().RegisterClosePanelEvent(_this.OnViewCloseMessageHandle.bind(_this), "viewCtrCloseTag");
        return _this;
    }

    _createClass(ViewCtrManager, [{
        key: "OnViewCloseMessageHandle",
        value: function OnViewCloseMessageHandle(name) {
            this.OpenModuleDic[name] && this.OpenModuleDic[name].Close();
        }
    }, {
        key: "AddViewCtr",
        value: function AddViewCtr(ctr) {
            this.OpenModuleDic[ctr.moduleName] = ctr;
        }
    }, {
        key: "RemoveViewCtr",
        value: function RemoveViewCtr(ctr) {
            this.OpenModuleDic[ctr.moduleName] && delete this.OpenModuleDic[ctr.moduleName];
        }
    }, {
        key: "OpenViewCtr",
        value: function OpenViewCtr(ctr) {
            if (ctr.openStatus == moduleEnum.None) return;
            //从栈中移除，防止重复入栈
            var index = this.openModuleStack.indexOf(ctr.moduleName);
            if (index >= 0) this.openModuleStack.splice(index, 1);
            //需要隐藏其他模块
            if (ctr.openStatus !== moduleEnum.NeedHide) {
                for (var i = 0; i < this.openModuleStack.length; i++) {
                    var element = this.openModuleStack[i];
                    this.OpenModuleDic[element].Close();
                }
            }
            //将打开的模块放入栈
            this.openModuleStack.push(ctr.moduleName);
        }
    }, {
        key: "CloseViewCtr",
        value: function CloseViewCtr(ctr) {
            if (ctr.openStatus === moduleEnum.None) return;
            var index = this.openModuleStack.indexOf(ctr.moduleName);
            //如果打开的是栈顶元素 并且打开模式是HideOther
            if (ctr.openStatus === moduleEnum.HideOther && index === this.openModuleStack.length - 1) {
                this.openModuleStack.pop();
                var _ctr = null;
                for (var i = this.openModuleStack.length - 1; i >= 0; i--) {
                    _ctr = this.OpenModuleDic[this.openModuleStack[i]];
                    _ctr.Open();
                    //当打开到需要隐藏其他模块的模块时，就停止
                    if (_ctr.openStatus !== moduleEnum.NeedHide) break;
                }
            }
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new ViewCtrManager();
        }
    }]);

    return ViewCtrManager;
}(_SingletonBase3.default);

exports.default = ViewCtrManager;
module.exports = exports["default"];

cc._RF.pop();