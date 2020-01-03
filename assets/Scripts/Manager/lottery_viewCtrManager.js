import SingletonBase from "../Singleton/SingletonBase";
import ViewComponentManager from "./lottery_viewComponentManager";

const { moduleEnum } = require("ProjectEnum")
/**界面模块管理类，出来模块与模块之间的关联 */
export default class ViewCtrManager extends SingletonBase {
    constructor() {
        super()
        ViewComponentManager.getInstance().RegisterClosePanelEvent(this.OnViewCloseMessageHandle.bind(this), "viewCtrCloseTag")
    }

    static _onNewObject() {
        return new ViewCtrManager()
    }

    OpenModuleDic = {}
    openModuleStack = []


    OnViewCloseMessageHandle(name) {
        this.OpenModuleDic[name] && this.OpenModuleDic[name].Close()
    }

    AddViewCtr(ctr) {
        this.OpenModuleDic[ctr.moduleName] = ctr
    }
    RemoveViewCtr(ctr) {
        this.OpenModuleDic[ctr.moduleName] && delete this.OpenModuleDic[ctr.moduleName]
    }
    OpenViewCtr(ctr) {
        if (ctr.openStatus == moduleEnum.None) return;
        //从栈中移除，防止重复入栈
        let index = this.openModuleStack.indexOf(ctr.moduleName)
        if (index >= 0) this.openModuleStack.splice(index, 1)
        //需要隐藏其他模块
        if (ctr.openStatus !== moduleEnum.NeedHide) {
            for (let i = 0; i < this.openModuleStack.length; i++) {
                const element = this.openModuleStack[i];
                this.OpenModuleDic[element].Close()
            }
        }
        //将打开的模块放入栈
        this.openModuleStack.push(ctr.moduleName);
    }
    CloseViewCtr(ctr) {
        if (ctr.openStatus === moduleEnum.None) return;
        let index = this.openModuleStack.indexOf(ctr.moduleName)
        //如果打开的是栈顶元素 并且打开模式是HideOther
        if (ctr.openStatus === moduleEnum.HideOther && index === this.openModuleStack.length - 1) {
            this.openModuleStack.pop();
            let _ctr = null;
            for (let i = this.openModuleStack.length - 1; i >= 0; i--) {
                _ctr = this.OpenModuleDic[this.openModuleStack[i]]
                _ctr.Open()
                //当打开到需要隐藏其他模块的模块时，就停止
                if (_ctr.openStatus !== moduleEnum.NeedHide) break;
            }
        }
    }
}