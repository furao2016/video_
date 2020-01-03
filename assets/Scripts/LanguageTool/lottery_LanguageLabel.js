/**
 * 多语言Label类
 */
import lottery_LanguageManager from "lottery_LanguageManager";

cc.Class({
    extends: require("lottery_LanguageTool"),

    editor: CC_EDITOR && {
        menu: 'i18n:language/label',
    },

    properties: {
        Label: {
            default: null,
            type: cc.Label,
            tooltip: "文本显示组件对象"
        },
    },

    onLoad() {
        this._super();
        if (this.Label == null)
            this.Label = this.node.getComponent(cc.Label);
        this.UpdateText();
    },

    UpdateText() {
        if (!this.languageID) {
            return;
        }
        // if (this.languageID == "CP_API_30") {
        //     console.log();
        // }
        this.languageManager = this.languageManager || lottery_LanguageManager.getInstance();
        let str = this.languageManager.GetLanguageText(this.languageID);
        if (this.args && this.args.length > 0) {
            for (let index = 0; index < this.args.length; index++) {
                const element = this.args[index];
                str = str.replace("{" + index + "}", element)
            }
        }
        this.Label.string = str
    },
});