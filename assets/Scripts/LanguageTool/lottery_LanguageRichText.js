/**
 * 多语言RichText类
 */
cc.Class({
    extends: require("lottery_LanguageTool"),

    editor: CC_EDITOR && {
        menu: 'i18n:language/richtext',
    },

    properties: {
        Label: {
            default: null,
            type: cc.RichText,
            tooltip: "文本显示组件对象"
        },
        constStrArr: [],//固定字符串数组
        keyArr: [],//key值列表
    },

    onLoad() {
        this._super();
        if (this.Label == null)
            this.Label = this.node.getComponent(cc.RichText);
    },

    UpdateText() {
        this.languageManager || (this.languageManager = cc.lottery.LanguageManager);
        if (this.languageID) {
            this.keyArr = [[this.languageID]];
            this.constStrArr = [[""]];
        }
        if (!this.constStrArr.length) {
            return;
        }
        let resultStr = "";
        for (let i = 0; i < this.constStrArr.length; i++) {
            let constStrs = this.constStrArr[i];
            let keys = this.keyArr[i] || [];
            for (let j = 0; j < constStrs.length; j++) {
                resultStr += constStrs[j];
                let key = keys[j] || "";
                if (!key) {
                    continue;
                }
                let str = this.languageManager.GetLanguageText(key);
                let args = this.args.length ? this.args[i][j] : [];
                for (let index = 0; index < args.length; index++) {
                    const element = args[index];
                    str = str.replace("{" + index + "}", element)
                }
                resultStr += str;
            }
        }
        this.Label.string = resultStr;
    },

    /**
     * constStrArr为固定字符串数组，类型为二维数组
     * keyArr为key值列表，类型为二维数组
     */
    setLanguageId(constStrArr, keyArr) {
        this.constStrArr = constStrArr;
        this.keyArr = keyArr;
        this.UpdateText();
    },

    changeLanguage(lang) {
        if (!this.node.active) {
            this.changeLanguageEnum = lang
            return;
        }
        this.curLanguageEnum = this.changeLanguageEnum;
        this.UpdateText();
    },

    /**
     * args需要替换的特殊字符,为三维数组
     */
    SetArgs(args) {
        this.args = args;
        this.UpdateText();
    },
});
