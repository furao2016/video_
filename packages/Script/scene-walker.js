let viewStr = "cc.Class({\n \
    extends: require(\"lottery_viewBaseComponent\"),\n \
    properties: {\n\
{0}\
    },\n \
    /*------------------子类重写函数---------------*/\n \
    OnInit() {\n\
        this.moduleName = \"{1}\"\n\
    },\n \
    OnShow() { },\n \
    OnHide() { },\n \
    OnDispose() { },\n \
    _onMessageHandel(data) { }\n \
});";
let ctrlStr = "\
import ViewCtrBase from \"../lottery_viewCtrBase\";\n\
\n\
export default class {0}Ctr extends ViewCtrBase{\n\
    constructor(){\n\
        super()\n\
        this.Init()\n\
    }\n\
\n\
    static _onNewObject() {\n\
        return new {0}Ctr()\n\
    }\n\
    AddEvent(){\n\
    }\n\
    RemoveEvent(){\n\
    }\n\
    _OnMessageHandle(data){\n\
        let _data = data\n\
        /*\n\
        TODO:处理消息然后返回给OnMessageHandle 往view层发送\n\
        */\n\
        return _data\n\
    }\n\
    OnInit(){\n\
        this.moduleName = \"{0}\"\n\
    }\n\
    OnOpen(){}\n\
    OnClose(){}\n\
    OnDestroy(){}\n\
}";
module.exports = {
    /**创建界面脚本 */
    CreateViewJS() {
        let scene = cc.director.getScene();
        let panel = scene.children[0];
        let str = viewStr;
        let url = "db://assets/Scripts/UI/" + panel.name + "/" + panel.name + "View.js";
        let variableStr = this._GetVariable("", panel)
        str = str.replace("{0}", variableStr)
        str = str.replace("{1}", panel.name)
        Editor.assetdb.createOrSave(url, str, () => {
            cc.log("创建成功!!! script path=" + url)
        });
    },
    /**创建控制脚本*/
    CreateControllerJS() {
        let scene = cc.director.getScene();
        let panel = scene.children[0];
        let str = ctrlStr;
        str = str.replace("{0}", panel.name)
        str = str.replace("{0}", panel.name)
        str = str.replace("{0}", panel.name)
        let url = "db://assets/Scripts/UI/" + panel.name + "/" + panel.name + "Ctr.js";
        Editor.assetdb.createOrSave(url, str, () => {
            cc.log("创建成功!!! script path=" + url)
        });
    },
    /**创建文件夹 */
    CreateDir() {
        let scene = cc.director.getScene();
        let panel = scene.children[0];
        let url = "db://assets/Scripts/UI/" + panel.name;
        Editor.assetdb.createOrSave(url, "", () => {
            cc.log("创建成功!!! script path=" + url)
        });
    },

    /**获取变量声明字符串*/
    _GetVariable(str, node) {
        if (node.name.indexOf("syn") >= 0) {
            str += ("       " + node.name.replace("syn", "") + ":" + this._GetVariableType(node) + ",\n")
        }
        if (node.childrenCount > 0) {
            for (let index = 0; index < node.childrenCount; index++) {
                const element = node.children[index];
                str = this._GetVariable(str, element)
            }
        }
        return str
    },
    _GetVariableType(node) {
        if (node.getComponent(cc.Label)) return "cc.Label";
        if (node.getComponent(cc.Sprite)) return "cc.Sprite";
        return "cc.Node"
    }
};