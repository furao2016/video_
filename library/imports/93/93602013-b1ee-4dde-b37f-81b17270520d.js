"use strict";
cc._RF.push(module, '93602ATse5N3rN/gbFycFIN', 'lottery_viewComponentManager');
// Scripts/Manager/lottery_viewComponentManager.js

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

var _lottery_BaseResLoad = require("lottery_BaseResLoad");

var _lottery_BaseResLoad2 = _interopRequireDefault(_lottery_BaseResLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var curZIndex = 0;
var ViewOpenEventKey = "ViewOpenEventKey";
var ViewCloseEventKey = "ViewCloseEventKey";

var ViewComponentManager = function (_SingletonBase) {
    _inherits(ViewComponentManager, _SingletonBase);

    function ViewComponentManager() {
        _classCallCheck(this, ViewComponentManager);

        var _this = _possibleConstructorReturn(this, (ViewComponentManager.__proto__ || Object.getPrototypeOf(ViewComponentManager)).call(this));

        _this.panelDic = {};
        _this.canvas = null;
        _this.curOpenPanelName = "";
        return _this;
    }

    _createClass(ViewComponentManager, [{
        key: "_onDestroyObject",
        value: function _onDestroyObject() {
            this.ChangeScene();
        } //缓存面板  key : 界面名字 value : viewBaseComponent对象

    }, {
        key: "OpenByPrefab",

        /**根据加载好的预设实例化界面
         * conpoment 继承 viewBase 的类对象
         */
        value: function OpenByPrefab(panelname, obj, callback) {
            var panel = cc.instantiate(obj);
            if (this.canvas == null) this.canvas = cc.find("Canvas");
            panel.parent = this.canvas;
            panel.setPosition(0, 0);
            var view = panel.getComponent('lottery_viewBaseComponent');
            this.panelDic[panelname] = view;
            view.Init(panel, panelname);
            if (callback != null && typeof callback == "function") callback(view);
        }
        /**
         * 打开面板
         * @param {*} name 面板名字
         * @param {*} model 打开模式
         */

    }, {
        key: "OpenPanel",
        value: function OpenPanel(name) {
            var panel = this.panelDic[name];
            panel.Show();
            panel.node.zIndex = curZIndex;
            curZIndex++;
            this.curOpenPanelName = name;
        }
        /**
         * 关闭面板
         * @param {*} name 面板名字
         */

    }, {
        key: "ClosePanel",
        value: function ClosePanel(name) {
            var view = this.panelDic[name];
            view.Hide();
            curZIndex--;
            view = this.panelDic[this.curOpenPanelName];
            view.node.zIndex = curZIndex;
            curZIndex++;
            _lottery_GlobalMsg2.default.getInstance().Send(ViewCloseEventKey, name);
        }

        /**
         * 删除面板
         * @param {*} name 面板名字
         */

    }, {
        key: "DeletePanel",
        value: function DeletePanel(name) {
            var view = this.panelDic[name];
            // view.Hide();
            if (view && view.node) {
                view.node.removeFromParent(false);
                delete this.panelDic[name];
            }

            curZIndex--;
            view = this.panelDic[this.curOpenPanelName];
            // view.node.zIndex = curZIndex;
            curZIndex++;
            _lottery_GlobalMsg2.default.getInstance().Send(ViewCloseEventKey, name);
        }

        /*------------------------对外接口---------------------------*/
        /**
         * 打开面板
         * panelname:面板名称
         * component:面板对应的脚本名 继承 viewBase
         * callback:打开面板后的回调方法
         * model:打开模式
         */

    }, {
        key: "Open",
        value: function Open(panelname, callback) {
            var self = this;
            var openPanel = function openPanel(node) {
                self.OpenPanel(panelname);
                if (callback != null && typeof callback == "function") callback(node);
            };

            if (this.panelDic[panelname] == null) {
                var resCall = function resCall(err, obj, key) {
                    if (err) {
                        cc.log("加载失败 err:" + err);
                        callback();
                    } else {
                        self.OpenByPrefab(panelname, obj, openPanel);
                    }
                };
                _lottery_BaseResLoad2.default.getInstance().LoadByKey(panelname, "Prefab/" + panelname, resCall);
            } else {
                openPanel(this.panelDic[panelname]);
            }
        }
        //关闭面板，预留，后期会增加关闭面板后的一些处理逻辑

    }, {
        key: "Close",
        value: function Close(panelname) {
            //关闭当前面板
            // this.ClosePanel(panelname);
            this.DeletePanel(panelname);
        }
    }, {
        key: "CloseAllView",
        value: function CloseAllView() {
            for (var key in this.panelDic) {
                var element = this.panelDic[key];
                if (element.node.active) {
                    element.onClose();
                }
            }
        }
        /**切换场景，所有界面会被销毁，这个时候需要清理一次数据，以及调用所有界面的ondestroy函数 */

    }, {
        key: "ChangeScene",
        value: function ChangeScene() {
            for (var key in this.panelDic) {
                var element = this.panelDic[key];
                element.onDestroy();
            }
            this.panelDic = {};
            this.canvas = null;
            this.curOpenPanelName = "";
        }
        /**注册关闭界面监听事件，主要用于界面在关闭时，控制层收到消息 帮助控制层和界面层脱偶 */

    }, {
        key: "RegisterClosePanelEvent",
        value: function RegisterClosePanelEvent(callback, tag) {
            _lottery_GlobalMsg2.default.getInstance().Register(ViewCloseEventKey, callback, tag);
        }
    }, {
        key: "UnRegisterClosePanelEvent",
        value: function UnRegisterClosePanelEvent(tag) {
            _lottery_GlobalMsg2.default.getInstance().Unregister(ViewCloseEventKey, tag);
        }
    }, {
        key: "RegisterOpenPanelEvent",
        value: function RegisterOpenPanelEvent(callback, tag) {
            _lottery_GlobalMsg2.default.getInstance().Register(ViewOpenEventKey, callback, tag);
        }
    }, {
        key: "UnRegisterOpenPanelEvent",
        value: function UnRegisterOpenPanelEvent(tag) {
            _lottery_GlobalMsg2.default.getInstance().Unregister(ViewOpenEventKey, tag);
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new ViewComponentManager();
        }
    }]);

    return ViewComponentManager;
}(_SingletonBase3.default);

exports.default = ViewComponentManager;
module.exports = exports["default"];

cc._RF.pop();