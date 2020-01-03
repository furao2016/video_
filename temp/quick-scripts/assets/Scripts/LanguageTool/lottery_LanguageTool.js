(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LanguageTool/lottery_LanguageTool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f8e2838WyNMeKTSJmJqKvFJ', 'lottery_LanguageTool', __filename);
// Scripts/LanguageTool/lottery_LanguageTool.js

"use strict";

var _lottery_LanguageManager = require("lottery_LanguageManager");

var _lottery_LanguageManager2 = _interopRequireDefault(_lottery_LanguageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        }
    },
    onLoad: function onLoad() {
        this.languageManager = _lottery_LanguageManager2.default.getInstance();
        this.languageManager.Register(this.node.uuid, this.changeLanguage, this);
    },
    onEnable: function onEnable() {
        if (this.curLanguageEnum !== this.changeLanguageEnum) {
            this.changeLanguage(this.changeLanguageEnum);
        }
    },
    onDestroy: function onDestroy() {
        this.languageManager.UnRegister(this.node.uuid);
    },
    changeLanguage: function changeLanguage(lang) {
        if (!this.node.active) {
            this.changeLanguageEnum = lang;
            return;
        }
        this.curLanguageEnum = this.changeLanguageEnum;
        if (this.languageID) this.UpdateText();
    },

    /**子类重写的方法 */
    UpdateText: function UpdateText() {},

    /**动态设置语言ID 刷新一次文本*/
    SetLanguageID: function SetLanguageID(id) {
        this.languageID = id;
        if (this.languageID) this.UpdateText();
    },

    /**设置格式化字符串的参数 采用动态参数 arguments*/
    SetArgs: function SetArgs() {
        this.args = arguments;
        if (this.languageID) this.UpdateText();
    }
}); /**
     * 多语言脚本基类，主要处理逻辑包括 事件的监听与反监听，文本刷新逻辑
     * 如果在关闭状态下 只记录修改状态 不刷新文本，打开后对比改变值与显示值，不相同就刷新
     */

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
        //# sourceMappingURL=lottery_LanguageTool.js.map
        