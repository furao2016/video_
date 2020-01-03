import SingletonBase from "../Singleton/SingletonBase";
import GlobalMsg from "../Core/Event/lottery_GlobalMsg";
import ViewComponentManager from "../Manager/lottery_viewComponentManager";
import ViewCtrManager from "../Manager/lottery_viewCtrManager";

const { moduleEnum } = require("ProjectEnum")

export default class ViewCtrBase extends SingletonBase {

    ModuleStatus = cc.Enum({
        none: 0,
        init: 1,
        close: 2,
        open: 3
    })

    moduleName = ""
    curModuleStatus = 0
    openStatus = moduleEnum.None
    viewNode = ""

    constructor() {
        super()
    }

    /**
     * 创建实例的静态回调方法。由子类重写，并返回具体类型的对象
     */
    static _onNewObject() {
        return new ViewCtrBase()
    }
    /**重写父类的销毁函数*/
    _onDestroyObject() {
        this.Destroy()
    }
    /*-----------------------------生命周期函数-------------------------------*/
    Init() {
        if (this.curModuleStatus >= this.ModuleStatus.init) return;
        this.curModuleStatus = this.ModuleStatus.init
        this.AddEvent()
        this.OnInit()
        ViewCtrManager.getInstance().AddViewCtr(this)
    }
    Open() {
        if (this.curModuleStatus === this.ModuleStatus.open) return;
        this.curModuleStatus = this.ModuleStatus.open
        ViewCtrManager.getInstance().OpenViewCtr(this)
        ViewComponentManager.getInstance().Open(this.moduleName, (script) => {
            this.viewNode = script.node;
            this.OnOpen()
        })
    }
    Close() {
        if (this.curModuleStatus !== this.ModuleStatus.open) return;
        if (this.curModuleStatus === this.ModuleStatus.close) return;
        this.curModuleStatus = this.ModuleStatus.close
        ViewCtrManager.getInstance().CloseViewCtr(this)
        ViewComponentManager.getInstance().Close(this.moduleName)
        this.OnClose()
    }
    Destroy() {
        if (this.curModuleStatus === this.ModuleStatus.none) return;
        this.curModuleStatus = this.ModuleStatus.none
        this.RemoveEvent()
        ViewCtrManager.getInstance().RemoveViewCtr(this)
        this.OnDestroy()
    }
    /**数据处理*/
    OnMessageHandle(data) {
        let _data = this._OnMessageHandle(data)
        if (this.curModuleStatus === this.ModuleStatus.open)//只有在该模块是被打开的状态下才推送数据
            GlobalMsg.getInstance().Send(this.moduleName, _data)
    }
    /**
     * 获取view层节点
     */
    getViewNode() {
        return this.viewNode;
    }
    /**
     * 显示view层节点
     */
    showViewNode() {
        this.viewNode && (this.viewNode.active = true);
    }
    /**
     * 隐藏view层节点
     */
    hideViewNode() {
        this.viewNode && (this.viewNode.active = false);
    }
    /*----------------------子类重写方法-----------------------*/
    /**添加监听 */
    AddEvent() {
        /*
        TODO:向数据层/数据控制层注册监听
        */
    }
    /**取消监听 */
    RemoveEvent() {
        /*
        TODO:讲注册在数据层/数据控制层的监听去掉
        */
    }
    _OnMessageHandle(data) {
        let _data = data
        /**
         * TODO:处理消息然后返回给OnMessageHandle 往view层发送
         */
        return _date
    }
    OnInit() { }
    OnOpen() { }
    OnClose() { }
    OnDestroy() { }
}