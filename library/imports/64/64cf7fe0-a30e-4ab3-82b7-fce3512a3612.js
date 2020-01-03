"use strict";
cc._RF.push(module, '64cf7/gow5Ks4K3/ONRKjYS', 'lottery_TypeSelect');
// Scripts/UI/view_login/lottery_TypeSelect.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _commonBtn = require("../tools/commonBtn");

var _commonBtn2 = _interopRequireDefault(_commonBtn);

var _lottery_MsgStation = require("../../Data/lottery_MsgStation");

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

var _lottery_Utils = require("../../Core/Tools/lottery_Utils");

var _lottery_Utils2 = _interopRequireDefault(_lottery_Utils);

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

var lottertList = {
    CP1001: {
        title: "EBet 时时彩",
        spriteName: "lottery_pc28",
        lotteryCode: 'CP1001'
    },
    CP1002: {
        title: "EBET 3D",
        spriteName: "lottery_3d",
        lotteryCode: 'CP1002'
    },
    CP1003: {
        title: "EBet 快3",
        spriteName: "lottery_k3",
        lotteryCode: 'CP1003'
    },
    CP1004: {
        title: "EBet PK10",
        spriteName: "lottery_pk10",
        lotteryCode: 'CP1004'
    },
    CP1005: {
        title: "EBET 11选5",
        spriteName: "lottery_11x5",
        lotteryCode: 'CP1005'
    }
};

var lotterySelect = (_dec = property(cc.Node), _dec2 = property(cc.Node), _dec3 = property(cc.Node), _dec4 = property(cc.Node), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lotterySelect, _cc$Component);

    function lotterySelect() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lotterySelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lotterySelect.__proto__ || Object.getPrototypeOf(lotterySelect)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, "selectItem", _descriptor, _this), _initDefineProp(_this, "itemPrefab", _descriptor2, _this), _initDefineProp(_this, "closeBtn", _descriptor3, _this), _initDefineProp(_this, "submitBtn", _descriptor4, _this), _this.btnGroup = {
            arr: [],
            index: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    //彩种数据

    //类数组


    _createClass(lotterySelect, [{
        key: "onLoad",
        value: function onLoad() {
            this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.closeBtnDown, this);
            this.submitBtn.on(cc.Node.EventType.TOUCH_END, this.submitBtnDown, this);
        }
    }, {
        key: "show",
        value: function show(listData) {
            var _this2 = this;

            this.node.active = true;
            this.lotteryData = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = listData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var one = _step.value;

                    lottertList[one] && this.lotteryData.push(lottertList[one]);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var dataIndex = 0;
            this.btnGroup.index = null;
            this.btnGroup.arr.forEach(function (element) {
                var data = _this2.lotteryData[dataIndex++];
                if (data) element.updateData(data);else element.destroy();
            });
            var data = this.lotteryData[dataIndex];
            while (data) {
                var _one = cc.instantiate(this.itemPrefab);
                _one.active = true;
                this.btnGroup.arr.push(new selectBtn(data, _one, function () {}, this.btnGroup));
                this.selectItem.addChild(_one);
                data = this.lotteryData[++dataIndex];
            }
        }
    }, {
        key: "submitBtnDown",
        value: function submitBtnDown() {
            if (this.btnGroup.index == null) {
                _lottery_helper2.default.getInstance().showTips("请选择彩种");
            } else {
                _lottery_MsgStation2.default.getInstance().onSendLotteryChoice(this.lotteryData[this.btnGroup.index].lotteryCode);
            }
        }
    }, {
        key: "closeBtnDown",
        value: function closeBtnDown() {
            this.node.active = false;
        }
    }]);

    return lotterySelect;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectItem", [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "submitBtn", [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2)) || _class);
exports.default = lotterySelect;

var selectBtn = function (_groupBtn) {
    _inherits(selectBtn, _groupBtn);

    function selectBtn(data, node, callback, group) {
        _classCallCheck(this, selectBtn);

        var _this3 = _possibleConstructorReturn(this, (selectBtn.__proto__ || Object.getPrototypeOf(selectBtn)).call(this, node, callback, group));

        _this3.nameLable0 = cc.find('name', _this3.defaultNode).getComponent(cc.Label);
        _this3.nameLable1 = cc.find('name', _this3.selectNode).getComponent(cc.Label);
        _this3.icon = cc.find('icon', _this3.node).getComponent(cc.Sprite);
        _this3.updateData(data);
        return _this3;
    }

    _createClass(selectBtn, [{
        key: "updateData",
        value: function updateData(data) {
            this.select(false);
            this.nameLable0.string = data.title;
            this.nameLable1.string = data.title;
            _lottery_Utils2.default.getInstance().setSprite(this.icon, data.spriteName, 'texture1');
        }
    }, {
        key: "clean",
        value: function clean() {
            this.node.destroy();
        }
    }]);

    return selectBtn;
}(_commonBtn.groupBtn);

module.exports = exports["default"];

cc._RF.pop();