(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LanguageTool/lottery_LanguageLabel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9a7cv5Iq1B+qByHFfiaEs6', 'lottery_LanguageLabel', __filename);
// Scripts/LanguageTool/lottery_LanguageLabel.js

"use strict";

var _lottery_LanguageManager = require("lottery_LanguageManager");

var _lottery_LanguageManager2 = _interopRequireDefault(_lottery_LanguageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: require("lottery_LanguageTool"),

    editor: CC_EDITOR && {
        menu: 'i18n:language/label'
    },

    properties: {
        Label: {
            default: null,
            type: cc.Label,
            tooltip: "文本显示组件对象"
        }
    },

    onLoad: function onLoad() {
        this._super();
        if (this.Label == null) this.Label = this.node.getComponent(cc.Label);
        this.UpdateText();
    },
    UpdateText: function UpdateText() {
        if (!this.languageID) {
            return;
        }
        // if (this.languageID == "CP_API_30") {
        //     console.log();
        // }
        this.languageManager = this.languageManager || _lottery_LanguageManager2.default.getInstance();
        var str = this.languageManager.GetLanguageText(this.languageID);
        if (this.args && this.args.length > 0) {
            for (var index = 0; index < this.args.length; index++) {
                var element = this.args[index];
                str = str.replace("{" + index + "}", element);
            }
        }
        this.Label.string = str;
    }
}); /**
     * 多语言Label类
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
        //# sourceMappingURL=lottery_LanguageLabel.js.map
        