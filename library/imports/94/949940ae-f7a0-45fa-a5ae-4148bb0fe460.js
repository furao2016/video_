"use strict";
cc._RF.push(module, '94994Cu96BF+qWuQUi7D+Rg', 'lottery_tipsLayer');
// Scripts/UI/lottery_tipsLayer.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _descriptor;

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
var lottery_tipsLayer = (_dec = property(cc.Label), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lottery_tipsLayer, _cc$Component);

    function lottery_tipsLayer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_tipsLayer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_tipsLayer.__proto__ || Object.getPrototypeOf(lottery_tipsLayer)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, "strLable", _descriptor, _this), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(lottery_tipsLayer, [{
        key: "showTips",
        value: function showTips(content) {
            this.node.active = true;
            this.node.opacity = 255;
            this.node.stopAllActions();
            this.strLable.string = content;
            this.tipsToDisappear();
        }

        //自动隐藏

    }, {
        key: "tipsToDisappear",
        value: function tipsToDisappear() {
            var fade = cc.fadeOut(0.5);
            var fadeFunc = cc.callFunc(function () {
                this.node.active = false;
            }, this);

            this.action = cc.sequence(cc.delayTime(1), fade, fadeFunc);
            this.node.runAction(this.action);
        }
    }]);

    return lottery_tipsLayer;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "strLable", [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2)) || _class);
exports.default = lottery_tipsLayer;
module.exports = exports["default"];

cc._RF.pop();