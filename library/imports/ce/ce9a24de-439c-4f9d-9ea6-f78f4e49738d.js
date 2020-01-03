"use strict";
cc._RF.push(module, 'ce9a2TeQ5xPnZ6m949OSXON', 'lottery_LanguageManager');
// Scripts/Manager/lottery_LanguageManager.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_BaseResLoad = require("../Core/ResHandle/lottery_BaseResLoad");

var _lottery_BaseResLoad2 = _interopRequireDefault(_lottery_BaseResLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**多语言枚举 */
var languageEnum = cc.Enum({
    none: 0,
    cn: 1, //中文
    en: 2 //英语
});

var languageJSName = ["cn", "enus"]; //多语言文本名字
var languageStr = "Config/language/Manage_"; //多语言文本前缀
var languageNam = ["中文", "英语"];
/**多语言管理脚本*/

var languageManager = function (_SingletonBase) {
    _inherits(languageManager, _SingletonBase);

    function languageManager() {
        _classCallCheck(this, languageManager);

        var _this = _possibleConstructorReturn(this, (languageManager.__proto__ || Object.getPrototypeOf(languageManager)).call(this));

        _this.curLanguageID = 0;
        _this.languageDic = {};
        _this.changeEvent = {};
        _this.LanguageEnum = languageEnum;
        _this.languageNam = languageNam;
        return _this;
    }

    _createClass(languageManager, [{
        key: "loadLanguage",
        value: function loadLanguage() {
            var _this2 = this;

            var url = languageStr + languageJSName[this.curLanguageID - 1];
            _lottery_BaseResLoad2.default.getInstance().LoadByKey(languageJSName[this.curLanguageID - 1], url, function (err, text) {
                if (err) return;
                _this2.languageDic = JSON.parse(text);
                _this2.callEvent();
            });
        }
    }, {
        key: "callEvent",
        value: function callEvent() {
            for (var key in this.changeEvent) {
                this.changeEvent[key](this.curLanguageID);
            }
            var eventCus = new cc.Event.EventCustom("InitLanguageCallBack", false);
            cc.systemEvent.dispatchEvent(eventCus);
        }
        /*----------------------------------对外接口-------------------------------------- */

    }, {
        key: "InitLanguage",
        value: function InitLanguage(lang) {
            lang ? lang = lang : lang = languageEnum.cn; //如果不传入 则默认改为中文
            if (this.curLanguageID !== lang) {
                this.curLanguageID = lang;
                this.loadLanguage();
            }
        }
    }, {
        key: "Register",
        value: function Register(tag, callback, self) {
            this.changeEvent[tag] = self ? callback.bind(self) : callback;
        }
    }, {
        key: "UnRegister",
        value: function UnRegister(tag) {
            delete this.changeEvent[tag];
        }
    }, {
        key: "GetLanguageText",
        value: function GetLanguageText(key) {
            var value = this.languageDic[key] && this.languageDic[key];
            return value || key;
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new languageManager();
        }
    }]);

    return languageManager;
}(_SingletonBase3.default);

exports.default = languageManager;
module.exports = exports["default"];

cc._RF.pop();