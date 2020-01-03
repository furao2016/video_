"use strict";
cc._RF.push(module, '610capX0hRBtJk5RIplMKp7', 'lottery_LanguageRichTextKey');
// Scripts/LanguageTool/lottery_LanguageRichTextKey.js

'use strict';

var _lottery_BaseResLoad = require('lottery_BaseResLoad');

var _lottery_BaseResLoad2 = _interopRequireDefault(_lottery_BaseResLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 多语言RichText key类 从多语言文本获取到的是文本名字 需要从本地加载
 */
cc.Class({
    extends: require("lottery_LanguageTool"),

    editor: CC_EDITOR && {
        menu: 'i18n:language/richtextKey'
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

    onLoad: function onLoad() {
        this._super();
        if (this.Label == null) this.Label = this.node.getComponent(cc.RichText);
    },


    /**动态设置语言ID 刷新一次文本*/
    SetLanguageID: function SetLanguageID(id) {
        if (this.languageID === id) return;
        this.languageID = id;
        if (this.languageID) this.UpdateText();
    },
    UpdateText: function UpdateText() {
        var _this = this;

        var key = this.languageManager.GetLanguageText(this.languageID);
        var helper = cc.lottery.Helper;
        if (this.textCache[key]) {
            this.Label.string = this.textCache[key];
            return;
        }
        _lottery_BaseResLoad2.default.getInstance().LoadByKey(key, helper.Res.ConfigPath + "RuleText/" + key, function (err, text, _key) {
            if (_this.args && _this.args.length > 0) {
                for (var index = 0; index < _this.args.length; index++) {
                    var element = _this.args[index];
                    text = text.replace("{" + index + "}", element);
                }
            }
            _this.textCache[key] = text;
            _this.Label.string = text;
        });
    }
});

cc._RF.pop();