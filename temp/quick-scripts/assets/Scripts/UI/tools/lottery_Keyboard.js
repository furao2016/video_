(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/UI/tools/lottery_Keyboard.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '90a16dcoilHRYpJd88crC/i', 'lottery_Keyboard', __filename);
// Scripts/UI/tools/lottery_Keyboard.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _descriptor;

var _commonBtn = require("./commonBtn");

var _lottery_EventDefine = require("../../Data/lottery_EventDefine");

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
var lotteryKeyboard = (_dec = property(cc.Node), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lotteryKeyboard, _cc$Component);

    function lotteryKeyboard() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lotteryKeyboard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lotteryKeyboard.__proto__ || Object.getPrototypeOf(lotteryKeyboard)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, "content", _descriptor, _this), _this.keyBoardArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -1], _this.itemArr = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    //keyBoardjs


    _createClass(lotteryKeyboard, [{
        key: "onLoad",
        value: function onLoad() {
            for (var index in this.keyBoardArr) {
                var one = this.content.children[index];
                this.itemArr.push(new _commonBtn.radioBtn(one, this.numKeyDown.bind(this, index)));
            }
        }

        //按下按钮的回调

    }, {
        key: "numKeyDown",
        value: function numKeyDown(index) {
            cc.systemEvent.emit(_lottery_EventDefine.lottery_EventDefine.loginView.keyboradNum, this.keyBoardArr[index]);
        }
    }]);

    return lotteryKeyboard;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2)) || _class);
exports.default = lotteryKeyboard;
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
        //# sourceMappingURL=lottery_Keyboard.js.map
        