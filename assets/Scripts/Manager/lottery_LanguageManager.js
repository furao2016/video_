import SingletonBase from "SingletonBase";
import BaseResLoad from "../Core/ResHandle/lottery_BaseResLoad";

/**多语言枚举 */
let languageEnum = cc.Enum({
    none: 0,
    cn: 1,//中文
    en: 2,//英语
})

const languageJSName = ["cn", "enus"]//多语言文本名字
const languageStr = "Config/language/Manage_"//多语言文本前缀
const languageNam = ["中文", "英语"];
/**多语言管理脚本*/
export default class languageManager extends SingletonBase {

    curLanguageID = 0
    languageDic = {}
    changeEvent = {}
    LanguageEnum = languageEnum
    languageNam = languageNam

    constructor() {
        super();
    }

    static _onNewObject() {
        return new languageManager();
    }

    loadLanguage() {
        let url = languageStr + languageJSName[this.curLanguageID - 1]
        BaseResLoad.getInstance().LoadByKey(languageJSName[this.curLanguageID - 1], url, (err, text) => {
            if (err)
                return;
            this.languageDic = JSON.parse(text)
            this.callEvent();
        })
    }
    callEvent() {
        for (const key in this.changeEvent) {
            this.changeEvent[key](this.curLanguageID);
        }
        let eventCus = new cc.Event.EventCustom("InitLanguageCallBack", false);
        cc.systemEvent.dispatchEvent(eventCus);
    }
    /*----------------------------------对外接口-------------------------------------- */
    InitLanguage(lang) {
        lang ? (lang = lang) : (lang = languageEnum.cn)//如果不传入 则默认改为中文
        if (this.curLanguageID !== lang) {
            this.curLanguageID = lang;
            this.loadLanguage();
        }
    }
    Register(tag, callback, self) {
        this.changeEvent[tag] = self ? callback.bind(self) : callback;
    }
    UnRegister(tag) {
        delete this.changeEvent[tag];
    }
    GetLanguageText(key) {
        let value = this.languageDic[key] && this.languageDic[key]
        return value || key;
    }
}