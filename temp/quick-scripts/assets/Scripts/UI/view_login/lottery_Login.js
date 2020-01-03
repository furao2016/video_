(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/UI/view_login/lottery_Login.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '886598LgnxP26wzdlv4VBYl', 'lottery_Login', __filename);
// Scripts/UI/view_login/lottery_Login.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _commonBtn = require("../tools/commonBtn");

var _lottery_EventDefine = require("../../Data/lottery_EventDefine");

var _lottery_MsgStation = require("../../Data/lottery_MsgStation");

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

var _lottery_helper = require("../tools/lottery_helper");

var _lottery_helper2 = _interopRequireDefault(_lottery_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    property = _cc$_decorator.property;
var lotteryLogin = (_dec = property(cc.Node), _dec2 = property(cc.Node), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lotteryLogin, _cc$Component);

    function lotteryLogin() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lotteryLogin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lotteryLogin.__proto__ || Object.getPrototypeOf(lotteryLogin)).call.apply(_ref, [this].concat(args))), _this), _this.btnGruop = {
            arr: [],
            index: null
        }, _initDefineProp(_this, "content", _descriptor, _this), _initDefineProp(_this, "sumbitBtn", _descriptor2, _this), _temp), _possibleConstructorReturn(_this, _ret);
    }
    //BtnArr


    _createClass(lotteryLogin, [{
        key: "onLoad",
        value: function onLoad() {
            for (var i = 0, length = this.content.children.length; i < length; i++) {
                this.btnGruop.arr.push(new loginCotentBtn(this.content.children[i], function () {}, this.btnGruop));
            }
            this.sumbitBtn.on(cc.Node.EventType.TOUCH_END, this.submitInfor, this);
        }
    }, {
        key: "onEnable",
        value: function onEnable() {
            cc.systemEvent.on(_lottery_EventDefine.lottery_EventDefine.loginView.keyboradNum, this.setContent, this);
        }
    }, {
        key: "onDisable",
        value: function onDisable() {
            cc.systemEvent.off(_lottery_EventDefine.lottery_EventDefine.loginView.keyboradNum, this.setContent, this);
        }

        /**
         * 提交按钮
         */

    }, {
        key: "submitInfor",
        value: function submitInfor() {
            var user = this.btnGruop.arr[0].editbox.string;
            var password = this.btnGruop.arr[1].editbox.string;
            if (user == '') _lottery_helper2.default.getInstance().showTips("用户名不能为空");else if (password == '') _lottery_helper2.default.getInstance().showTips("密码不能为空");else _lottery_MsgStation2.default.getInstance().onSendEnterLogin(user, password);
        }

        /**
         * 通过虚拟键盘输入文本框
         * @param {*} event 
         */

    }, {
        key: "setContent",
        value: function setContent(event) {
            if (this.btnGruop.index == null) return;
            var btn = this.btnGruop.arr[this.btnGruop.index];
            var value = event.getUserData();
            if (value != -1) {
                btn.editbox.string += value;
                btn.delBtnNode.active = true;
            } else {
                var str = btn.editbox.string;
                str = str.substr(0, str.length - 1);
                btn.editbox.string = str;
                btn.delBtnNode.active = str.length ? true : false;
            }
        }
    }]);

    return lotteryLogin;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sumbitBtn", [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2)) || _class);

/**
 * 需要绑定输入框
 */

exports.default = lotteryLogin;

var loginCotentBtn = function (_groupBtn) {
    _inherits(loginCotentBtn, _groupBtn);

    function loginCotentBtn(node, downCallback, group) {
        _classCallCheck(this, loginCotentBtn);

        var _this2 = _possibleConstructorReturn(this, (loginCotentBtn.__proto__ || Object.getPrototypeOf(loginCotentBtn)).call(this, node, downCallback, group));

        _this2.node.off(cc.Node.EventType.TOUCH_END, _this2.touchEnd, _this2); //嗯 这里的写法有点奇怪
        _this2.editbox = cc.find('editbox', _this2.node).getComponent(cc.EditBox);
        _this2.delBtnNode = cc.find('deleteBtn', _this2.node);
        _this2.delBtnNode.on(cc.Node.EventType.TOUCH_END, _this2.delBtnDown, _this2);
        _this2.editbox.node.on('text-changed', _this2.editBoxChange, _this2);
        _this2.editbox.node.on('editing-did-began', _this2.editBoxBegin, _this2);
        return _this2;
    }

    _createClass(loginCotentBtn, [{
        key: "editBoxChange",
        value: function editBoxChange() {
            this.delBtnNode.active = this.editbox.string == "" ? false : true;
        }
    }, {
        key: "editBoxBegin",
        value: function editBoxBegin() {
            if (!this.isSelect) this.touchEnd();
            this.delBtnNode.active = this.editbox.string == "" ? false : true;
        }
    }, {
        key: "delBtnDown",
        value: function delBtnDown() {
            this.editbox.string = '';
            this.delBtnNode.active = false;
            this.touchEnd();
        }
    }]);

    return loginCotentBtn;
}(_commonBtn.groupBtn);

module.exports = exports["default"];

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
        //# sourceMappingURL=lottery_Login.js.map
        