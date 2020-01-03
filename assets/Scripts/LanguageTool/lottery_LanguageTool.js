/**
 * 多语言脚本基类，主要处理逻辑包括 事件的监听与反监听，文本刷新逻辑
 * 如果在关闭状态下 只记录修改状态 不刷新文本，打开后对比改变值与显示值，不相同就刷新
 */
import lottery_LanguageManager from "lottery_LanguageManager";

cc.Class({
    extends: cc.Component,

    properties: {
        languageID: {
            default: "",
            tooltip: "文本key"
        },
        languageManager: {
            default: null,
            visible: false
        },
        curLanguageEnum: {
            default: 0,
            visible: false
        },
        changeLanguageEnum: {
            default: 1,
            visible: false
        },
        args: {
            default: [],
            visible: false
        },
    },
    onLoad() {
        this.languageManager = lottery_LanguageManager.getInstance();
        this.languageManager.Register(this.node.uuid, this.changeLanguage, this);
    },
    onEnable() {
        if (this.curLanguageEnum !== this.changeLanguageEnum) {
            this.changeLanguage(this.changeLanguageEnum)
        }
    },
    onDestroy() {
        this.languageManager.UnRegister(this.node.uuid);
    },
    changeLanguage(lang) {
        if (!this.node.active) {
            this.changeLanguageEnum = lang
            return;
        }
        this.curLanguageEnum = this.changeLanguageEnum;
        if (this.languageID)
            this.UpdateText();
    },
    /**子类重写的方法 */
    UpdateText() {

    },
    /**动态设置语言ID 刷新一次文本*/
    SetLanguageID(id) {
        this.languageID = id;
        if (this.languageID)
            this.UpdateText();
    },
    /**设置格式化字符串的参数 采用动态参数 arguments*/
    SetArgs() {
        this.args = arguments;
        if (this.languageID)
            this.UpdateText();
    }
});