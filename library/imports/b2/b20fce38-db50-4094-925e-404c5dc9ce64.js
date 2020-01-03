"use strict";
cc._RF.push(module, 'b20fc4421BAlJJeQExdyc5k', 'lottery_viewBaseComponent');
// Scripts/UI/lottery_viewBaseComponent.js

"use strict";

var _lottery_GlobalMsg = require("../Core/Event/lottery_GlobalMsg");

var _lottery_GlobalMsg2 = _interopRequireDefault(_lottery_GlobalMsg);

var _lottery_viewComponentManager = require("../Manager/lottery_viewComponentManager");

var _lottery_viewComponentManager2 = _interopRequireDefault(_lottery_viewComponentManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewStatus = cc.Enum({
    none: 0,
    init: 1,
    close: 2,
    open: 3
});
cc.Class({
    extends: cc.Component,
    properties: {
        moduleName: {
            default: "",
            visible: false
        },
        curStatus: {
            default: ViewStatus.none
        }
    },
    /*------------------生命周期函数---------------*/
    Init: function Init() {
        if (this.curStatus >= ViewStatus.init) return;
        this.curStatus = ViewStatus.init;
        this.OnInit();
    },
    Show: function Show() {
        if (this.curStatus === ViewStatus.open) return;
        this.curStatus = ViewStatus.open;
        _lottery_GlobalMsg2.default.getInstance().Register(this.moduleName, this._onMessageHandel.bind(this), this.node.uuid);
        this.OnShow();
        this.node.active = true;
    },
    Hide: function Hide() {
        if (this.curStatus !== ViewStatus.open) return;
        if (this.curStatus === ViewStatus.close) return;
        this.curStatus = ViewStatus.close;
        _lottery_GlobalMsg2.default.getInstance().Unregister(this.moduleName, this.node.uuid);
        _lottery_viewComponentManager2.default.getInstance().Close(this.moduleName);
        this.OnHide();
        this.node.active = false;
    },
    Dispose: function Dispose() {
        if (this.curStatus === ViewStatus.none) return;
        this.curStatus = ViewStatus.none;
        this.OnDispose();
    },

    /*------------------子类重写函数---------------*/
    /**初始化一些缓存的节点数据*/
    OnInit: function OnInit() {},

    /**显示界面，作用等同于onEnable*/
    OnShow: function OnShow() {},

    /**关闭界面，作用等同于onDisable*/
    OnHide: function OnHide() {},

    /**销毁界面，作用等同于onDestroy*/
    OnDispose: function OnDispose() {},

    /**数据解析，接受controller层的数据消息，解析并显示 */
    _onMessageHandel: function _onMessageHandel(data) {
        var isHandle = true;
        switch (data.type) {
            default:
                isHandle = false;
                break;
        }
        return isHandle;
    }
});

cc._RF.pop();