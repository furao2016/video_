"use strict";
cc._RF.push(module, 'e33feBHdpNENK+x0MTBTqqY', 'lottery_loadingTip');
// Scripts/UI/tools/lottery_loadingTip.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _lottery_GlobalMsg = require("../../Core/Event/lottery_GlobalMsg");

var _lottery_GlobalMsg2 = _interopRequireDefault(_lottery_GlobalMsg);

var _lottery_EventDefine = require("../../Data/lottery_EventDefine");

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
var lottery_loadingTip = (_dec = property(cc.Integer), _dec2 = property(cc.Node), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lottery_loadingTip, _cc$Component);

    function lottery_loadingTip() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_loadingTip);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_loadingTip.__proto__ || Object.getPrototypeOf(lottery_loadingTip)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, "playLongTime", _descriptor, _this), _initDefineProp(_this, "actionNode", _descriptor2, _this), _this.timeId = null, _temp), _possibleConstructorReturn(_this, _ret);
    } //播放最长时间

    //定时器ID


    _createClass(lottery_loadingTip, [{
        key: "onEnable",
        value: function onEnable() {
            this.startAction();
        }
    }, {
        key: "onDisable",
        value: function onDisable() {
            this.actionNode.stopAllActions();
        }
        //开始播放

    }, {
        key: "startPlay",
        value: function startPlay() {
            var _this2 = this;

            this.node.active = true;
            this.timeId = setTimeout(function () {
                _this2.node.active = false;
                _lottery_GlobalMsg2.default.getInstance().Send(_lottery_EventDefine.lottery_EventDefine.sys.loadingOvertime);
            }, this.playLongTime);
        }
        //停止播放

    }, {
        key: "stopPlay",
        value: function stopPlay() {
            this.node.active = false;
            clearTimeout(this.timeId);
            this.timeId = null;
        }
    }, {
        key: "startAction",
        value: function startAction() {
            var callFunc = cc.callFunc(function () {
                this.actionNode.rotation += 30;
                this.actionNode.rotation %= 360;
            }.bind(this));
            var repfor = cc.repeatForever(cc.sequence(cc.delayTime(0.1), callFunc));
            this.actionNode.runAction(repfor);
        }
    }]);

    return lottery_loadingTip;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playLongTime", [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return 2500;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "actionNode", [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2)) || _class);
exports.default = lottery_loadingTip;
module.exports = exports["default"];

cc._RF.pop();