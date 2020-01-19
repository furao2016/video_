"use strict";
cc._RF.push(module, '17386MsSe5G86awSSJn46en', 'lottery_videoCom');
// Scripts/UI/videoCom/lottery_videoCom.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _videoShader = require('./videoShader1');

var _videoShader2 = _interopRequireDefault(_videoShader);

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
var lottery_videoCom = (_dec = property(cc.String), _dec2 = property(cc.Sprite), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lottery_videoCom, _cc$Component);

    function lottery_videoCom() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_videoCom);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_videoCom.__proto__ || Object.getPrototypeOf(lottery_videoCom)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, 'currentUrl', _descriptor, _this), _initDefineProp(_this, 'targetSprite', _descriptor2, _this), _this.texureImag = null, _this.targetSpriteFrame = null, _this._socketController = null, _this.isPlay = false, _temp), _possibleConstructorReturn(_this, _ret);
    } //目标sprite

    /*目标纹理2D*/

    /**目标spriteFrame*/

    /**socket控制*/


    /**isplay*/


    _createClass(lottery_videoCom, [{
        key: 'onLoad',
        value: function onLoad() {
            cc.game.on(cc.game.EVENT_HIDE, this.gameHideClose, this);
            cc.game.on(cc.game.EVENT_SHOW, this.gameShowReOpen, this);
            this.init();
        }
    }, {
        key: 'onEnable',
        value: function onEnable() {
            this.gameShowReOpen();
        }
    }, {
        key: 'onDisable',
        value: function onDisable() {
            this.gameHideClose();
        }
    }, {
        key: 'init',
        value: function init() {
            if (cc._renderType == cc.game.RENDER_TYPE_CANVAS) {
                console.log('canvas下无法播放');
                return;
            }
            this.isPlay = true;
            //获取播放sprite
            !this.targetSprite && (this.targetSprite = this.node.getComponent(cc.Sprite));
            !this.targetSprite && (this.targetSprite = this.node.addComponent(cc.Sprite));
            //创建纹理
            this.VideoShader = new _videoShader2.default();
            this.VideoShader.ShaderEffect(this.targetSprite.node);
            this.texureImag = new cc.Texture2D();
            //绑定sprite
            this.targetSpriteFrame = new cc.SpriteFrame(this.texureImag);
            this.targetSprite.spriteFrame = this.targetSpriteFrame;
        }

        //设置url

    }, {
        key: 'setUrl',
        value: function setUrl(url) {
            this.targetSprite.spriteFrame = null;
            this.currentUrl = url;
            if (this._socketController) {
                if (this.node.active) {
                    this._socketController._packageCache.clear();
                    this._socketController.setUrl(this.currentUrl);
                }
            } else {
                this._socketController = new lottery.video.VideoSocketController(this.currentUrl, false, true);
                this._socketController.onPictureDecoded = this.onPictureDecoded.bind(this);
            }
        }
        //播放投射到其他地方

    }, {
        key: 'changeTargetSprite',
        value: function changeTargetSprite(target) {
            target.spriteFrame = new cc.SpriteFrame(this.texureImag);
            this.VideoShader.ShaderEffect(target.node);
            target.node.height = 1080;
            target.node.width = 1980;
        }

        //图片编码

    }, {
        key: 'onPictureDecoded',
        value: function onPictureDecoded(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize) {
            if (!this.isPlay) return;
            if (!this.targetSprite.spriteFrame) this.targetSprite.spriteFrame = this.targetSpriteFrame;
            this.VideoShader._currentBuffer = data;
            this.texureImag.initWithData(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize);
            this.targetSprite.node.width = this.node.parent.width;
            this.targetSprite.node.height = this.node.parent.width * pixelsHeight / pixelsWidth;
        }
    }, {
        key: 'gameHideClose',
        value: function gameHideClose() {
            if (this._socketController) {
                this._socketController.close();
            }
        }
    }, {
        key: 'gameShowReOpen',
        value: function gameShowReOpen() {
            if (this._socketController) {
                this._socketController._currentUrl = this.currentUrl;
                this._socketController.reOpen();
            }
        }
    }, {
        key: 'update',
        value: function update(dt) {
            if (this.isPlay && this._socketController && this._socketController.onRenderingBefore) {
                this._socketController.onRenderingBefore(dt);
                this.VideoShader.Myrendering(ebet.videoSize);
            }
        }
    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            cc.game.off(cc.game.EVENT_HIDE, this.gameHideClose);
            cc.game.off(cc.game.EVENT_SHOW, this.gameShowReOpen);
            this._socketController.close();
            this._socketController = null;
        }
    }]);

    return lottery_videoCom;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'currentUrl', [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return 'ws://ws4.jiasula.info:8081/lobbyB/B15/19148936/6eca0113e34c41c1f45a5f9eaf13429c';
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'targetSprite', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class2)) || _class);
exports.default = lottery_videoCom;
module.exports = exports['default'];

cc._RF.pop();