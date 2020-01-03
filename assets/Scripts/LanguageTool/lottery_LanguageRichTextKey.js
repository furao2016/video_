import lottery_BaseResLoad from 'lottery_BaseResLoad'

/**
 * 多语言RichText key类 从多语言文本获取到的是文本名字 需要从本地加载
 */
cc.Class({
    extends: require("lottery_LanguageTool"),

    editor: CC_EDITOR && {
        menu: 'i18n:language/richtextKey',
    },

    properties: {
        Label: {
            default: null,
            type: cc.RichText,
            tooltip: "文本显示组件对象"
        },
        //文本缓存
        textCache: {
            default: {},
            visible: false
        }
    },

    onLoad() {
        this._super();
        if (this.Label == null)
            this.Label = this.node.getComponent(cc.RichText);
    },

    /**动态设置语言ID 刷新一次文本*/
    SetLanguageID(id) {
        if (this.languageID === id)
            return;
        this.languageID = id;
        if (this.languageID)
            this.UpdateText();
    },
    UpdateText() {
        let key = this.languageManager.GetLanguageText(this.languageID);
        let helper = cc.lottery.Helper;
        if (this.textCache[key]) {
            this.Label.string = this.textCache[key]
            return;
        }
        lottery_BaseResLoad.getInstance().LoadByKey(key, helper.Res.ConfigPath + "RuleText/" + key, (err, text, _key) => {
            if (this.args && this.args.length > 0) {
                for (let index = 0; index < this.args.length; index++) {
                    const element = this.args[index];
                    text = text.replace("{" + index + "}", element)
                }
            }
            this.textCache[key] = text
            this.Label.string = text;
        })
    }
});
