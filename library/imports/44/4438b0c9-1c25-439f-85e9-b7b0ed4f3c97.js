"use strict";
cc._RF.push(module, '4438bDJHCVDn4Xpt7DtTzyX', 'lottery_animCom');
// Scripts/UI/animCom/lottery_animCom.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

var _lottery_animDataMgr = require("../../Data/lottery_animDataMgr");

var _lottery_animDataMgr2 = _interopRequireDefault(_lottery_animDataMgr);

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
var lottery_animCom = (_dec = property(cc.Integer), _dec2 = property(cc.Boolean), _dec3 = property(cc.Boolean), _dec4 = property(cc.Sprite), _dec5 = property({ type: cc.String, tooltip: "获取animMgr中指定的序列帧数组" }), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lottery_animCom, _cc$Component);

    function lottery_animCom() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_animCom);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_animCom.__proto__ || Object.getPrototypeOf(lottery_animCom)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, "frameRate", _descriptor, _this), _initDefineProp(_this, "isLoop", _descriptor2, _this), _initDefineProp(_this, "isPlaying", _descriptor3, _this), _initDefineProp(_this, "targetSprite", _descriptor4, _this), _initDefineProp(_this, "folderName", _descriptor5, _this), _this.frameSpriteArr = [], _this.nowTime = 0, _this.startTime = 0, _this.frameTime = 0, _this.playFinishCallBack = null, _this.loadFail = false, _temp), _possibleConstructorReturn(_this, _ret);
    } //帧率
    //是否循环
    //是否正在播放
    //目标精灵
    //??这样写编辑器不会提示有问题
    //图集

    //当前时间

    //开始时间

    //帧间隔时间

    //播放完后的回调

    //setData的时候加载失败


    _createClass(lottery_animCom, [{
        key: "onLoad",
        value: function onLoad() {
            this.frameTime = 1 / this.frameRate;
            this.folderName && (this.frameSpriteArr = _lottery_animDataMgr2.default.getInstance().resDir[this.folderName]);
            !this.frameSpriteArr && (this.frameSpriteArr = []);
            !this.targetSprite && (this.targetSprite = this.node.getComponent(cc.Sprite));
        }
        //

    }, {
        key: "update",
        value: function update(dt) {
            if (this.loadFail) {
                this.frameSpriteArr = _lottery_animDataMgr2.default.getInstance().resDir[this.folderName];
                if (!this.frameSpriteArr || !this.frameSpriteArr.length) return;
                this.targetSprite.spriteFrame = this.frameSpriteArr[Math.floor(this.startTime / this.frameTime)];
                this.nowTime = this.startTime;
                this.isPlaying = true;
                this.loadFail = false;
                return;
            }
            if (!this.isPlaying) return;
            this.nowTime += dt;
            var index = Math.floor(this.nowTime / this.frameTime);
            if (index >= this.frameSpriteArr.length) {
                //大于总帧数
                if (this.isLoop) {
                    index = 0;
                    this.nowTime = this.startTime;
                } else {
                    this.isPlaying = false;
                    this.nowTime = this.startTime;
                    index = this.frameSpriteArr.length - 1;
                    this.playFinishCallBack && this.playFinishCallBack(this.folderName);
                }
            }
            this.targetSprite.spriteFrame = this.frameSpriteArr[index];
        }
        /**
         * 现在就停止播放
         */

    }, {
        key: "quickClosePlay",
        value: function quickClosePlay() {
            this.isPlaying = false;
            this.playFinishCallBack && this.playFinishCallBack();
        }

        /**
         * 设置播放
         * @param folderName 指定帧数组
         * @param startTime 开始时间
         */

    }, {
        key: "setData",
        value: function setData(folderName) {
            var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var isLoop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (folderName == '') return;
            this.folderName = folderName;
            this.isLoop = isLoop;
            this.startTime = startTime;
            this.nowTime = this.startTime;
            var data = _lottery_animDataMgr2.default.getInstance().resDir[folderName];
            if (!data || data.length == 0) {
                this.loadFail = true;return;
            }
            this.isPlaying = true;
            this.frameSpriteArr = data;
            this.targetSprite.spriteFrame = this.frameSpriteArr[Math.floor(this.nowTime / this.frameTime)];
        }
        //设置播放完成回调

    }, {
        key: "setFinshCallBack",
        value: function setFinshCallBack(callBack) {
            this.playFinishCallBack = callBack;
        }

        /**
         * 设置是否循环
         */

    }, {
        key: "setLoop",
        value: function setLoop(is) {
            this.isLoop = is;
        }
    }]);

    return lottery_animCom;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "frameRate", [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return 25;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLoop", [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return false;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isPlaying", [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return false;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "targetSprite", [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "folderName", [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return String;
    }
})), _class2)) || _class);
exports.default = lottery_animCom;
module.exports = exports["default"];

cc._RF.pop();