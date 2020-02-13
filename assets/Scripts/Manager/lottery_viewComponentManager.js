import SingletonBase from "../Singleton/SingletonBase";
import GlobalMsg from "../Core/Event/lottery_GlobalMsg";
import lottery_BaseResLoad from 'lottery_BaseResLoad'

let curZIndex = 0
let ViewOpenEventKey = "ViewOpenEventKey"
let ViewCloseEventKey = "ViewCloseEventKey"

export default class ViewComponentManager extends SingletonBase {
    constructor() {
        super()
    }
    static _onNewObject() {
        return new ViewComponentManager()
    }
    _onDestroyObject() {
        this.ChangeScene()
    }

    panelDic = {}//缓存面板  key : 界面名字 value : viewBaseComponent对象
    canvas = null
    curOpenPanelName = ""
    /**根据加载好的预设实例化界面
     * conpoment 继承 viewBase 的类对象
     */
    OpenByPrefab(panelname, obj, callback) {
        var panel = cc.instantiate(obj);
        if (this.canvas == null)
            this.canvas = cc.find("Canvas");
        panel.parent = this.canvas;
        panel.setPosition(0, 0);
        var view = panel.getComponent('lottery_viewBaseComponent');
        this.panelDic[panelname] = view;
        view.Init(panel, panelname);
        if (callback != null && typeof (callback) == "function")
            callback(view);
    }
    /**
     * 打开面板
     * @param {*} name 面板名字
     * @param {*} model 打开模式
     */
    OpenPanel(name) {
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
    ClosePanel(name) {
        var view = this.panelDic[name]
        view.Hide();
        curZIndex--;
        view = this.panelDic[this.curOpenPanelName]
        view.node.zIndex = curZIndex;
        curZIndex++;
        GlobalMsg.getInstance().Send(ViewCloseEventKey, name)
    }

    /**
     * 删除面板
     * @param {*} name 面板名字
     */
    DeletePanel(name) {
        var view = this.panelDic[name]
        // view.Hide();
        if (view && view.node) {
            view.node.removeFromParent(false);
            delete this.panelDic[name];
        }

        curZIndex--;
        view = this.panelDic[this.curOpenPanelName]
        // view.node.zIndex = curZIndex;
        curZIndex++;
        GlobalMsg.getInstance().Send(ViewCloseEventKey, name)
    }

    /*------------------------对外接口---------------------------*/
    /**
     * 打开面板
     * panelname:面板名称
     * component:面板对应的脚本名 继承 viewBase
     * callback:打开面板后的回调方法
     * model:打开模式
     */
    Open(panelname, callback) {
        var self = this;
        var openPanel = function (node) {
            self.OpenPanel(panelname);
            if (callback != null && typeof (callback) == "function")
                callback(node);
        }

        if (this.panelDic[panelname] == null) {
            var resCall = function (err, obj, key) {
                if (err) {
                    cc.log("加载失败 err:" + err)
                    callback()
                }
                else {
                    self.OpenByPrefab(panelname, obj, openPanel);
                }
            };
            lottery_BaseResLoad.getInstance().LoadByKey(panelname, "Prefab/" + panelname, resCall);
        }
        else {
            openPanel(this.panelDic[panelname]);
        }
    }
    //关闭面板，预留，后期会增加关闭面板后的一些处理逻辑
    Close(panelname) {
        //关闭当前面板
        //this.ClosePanel(panelname);
        this.DeletePanel(panelname);
    }
    CloseAllView() {
        for (const key in this.panelDic) {
            const element = this.panelDic[key];
            if (element.node.active) {
                element.onClose();
            }
        }
    }
    /**切换场景，所有界面会被销毁，这个时候需要清理一次数据，以及调用所有界面的ondestroy函数 */
    ChangeScene() {
        for (const key in this.panelDic) {
            const element = this.panelDic[key];
            element.onDestroy();
        }
        this.panelDic = {}
        this.canvas = null
        this.curOpenPanelName = ""
    }
    /**注册关闭界面监听事件，主要用于界面在关闭时，控制层收到消息 帮助控制层和界面层脱偶 */
    RegisterClosePanelEvent(callback, tag) {
        GlobalMsg.getInstance().Register(ViewCloseEventKey, callback, tag)
    }
    UnRegisterClosePanelEvent(tag) {
        GlobalMsg.getInstance().Unregister(ViewCloseEventKey, tag)
    }
    RegisterOpenPanelEvent(callback, tag) {
        GlobalMsg.getInstance().Register(ViewOpenEventKey, callback, tag)
    }
    UnRegisterOpenPanelEvent(tag) {
        GlobalMsg.getInstance().Unregister(ViewOpenEventKey, tag)
    }
}