import GlobalMsg from "../Core/Event/lottery_GlobalMsg";
import ViewComponentManager from "../Manager/lottery_viewComponentManager";
let ViewStatus = cc.Enum({
    none: 0,
    init: 1,
    close: 2,
    open: 3
})
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
    Init() {
        if (this.curStatus >= ViewStatus.init) return;
        this.curStatus = ViewStatus.init
        this.OnInit()
    },
    Show() {
        if (this.curStatus === ViewStatus.open) return;
        this.curStatus = ViewStatus.open
        GlobalMsg.getInstance().Register(this.moduleName, this._onMessageHandel.bind(this), this.node.uuid);
        this.OnShow()
        this.node.active = true;
    },
    Hide() {
        if (this.curStatus !== ViewStatus.open) return;
        if (this.curStatus === ViewStatus.close) return;
        this.curStatus = ViewStatus.close
        GlobalMsg.getInstance().Unregister(this.moduleName, this.node.uuid);
        ViewComponentManager.getInstance().Close(this.moduleName)
        this.OnHide()
        this.node.active = false;
    },
    Dispose() {
        if (this.curStatus === ViewStatus.none) return;
        this.curStatus = ViewStatus.none
        this.OnDispose()
    },
    /*------------------子类重写函数---------------*/
    /**初始化一些缓存的节点数据*/
    OnInit() { },
    /**显示界面，作用等同于onEnable*/
    OnShow() { },
    /**关闭界面，作用等同于onDisable*/
    OnHide() { },
    /**销毁界面，作用等同于onDestroy*/
    OnDispose() { },
    /**数据解析，接受controller层的数据消息，解析并显示 */
    _onMessageHandel(data) {
        let isHandle = true;
        switch (data.type) {
            default: isHandle = false;
                break;
        }
        return isHandle;
    }
});
