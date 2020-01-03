(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LanguageTool/lottery_LanguageRichText.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d6cejC/hJBA7UnpzSU6xem', 'lottery_LanguageRichText', __filename);
// Scripts/LanguageTool/lottery_LanguageRichText.js

"use strict";

/**
 * 多语言RichText类
 */
cc.Class({
    extends: require("lottery_LanguageTool"),

    editor: CC_EDITOR && {
        menu: 'i18n:language/richtext'
    },

    properties: {
        Label: {
            default: null,
            type: cc.RichText,
            tooltip: "文本显示组件对象"
        },
        constStrArr: [], //固定字符串数组
        keyArr: [] //key值列表
    },

    onLoad: function onLoad() {
        this._super();
        if (this.Label == null) this.Label = this.node.getComponent(cc.RichText);
    },
    UpdateText: function UpdateText() {
        this.languageManager || (this.languageManager = cc.lottery.LanguageManager);
        if (this.languageID) {
            this.keyArr = [[this.languageID]];
            this.constStrArr = [[""]];
        }
        if (!this.constStrArr.length) {
            return;
        }
        var resultStr = "";
        for (var i = 0; i < this.constStrArr.length; i++) {
            var constStrs = this.constStrArr[i];
            var keys = this.keyArr[i] || [];
            for (var j = 0; j < constStrs.length; j++) {
                resultStr += constStrs[j];
                var key = keys[j] || "";
                if (!key) {
                    continue;
                }
                var str = this.languageManager.GetLanguageText(key);
                var args = this.args.length ? this.args[i][j] : [];
                for (var index = 0; index < args.length; index++) {
                    var element = args[index];
                    str = str.replace("{" + index + "}", element);
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
    setLanguageId: function setLanguageId(constStrArr, keyArr) {
        this.constStrArr = constStrArr;
        this.keyArr = keyArr;
        this.UpdateText();
    },
    changeLanguage: function changeLanguage(lang) {
        if (!this.node.active) {
            this.changeLanguageEnum = lang;
            return;
        }
        this.curLanguageEnum = this.changeLanguageEnum;
        this.UpdateText();
    },


    /**
     * args需要替换的特殊字符,为三维数组
     */
    SetArgs: function SetArgs(args) {
        this.args = args;
        this.UpdateText();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=lottery_LanguageRichText.js.map
        