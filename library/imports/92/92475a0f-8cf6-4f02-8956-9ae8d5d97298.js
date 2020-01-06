"use strict";
cc._RF.push(module, '92475oPjPZPAolWmujV2XKY', 'lottery_videoFlow');
// Scripts/UI/view_videoSys/lottery_videoFlow.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _videoMsgFactory = require("./videoMsgFactory");

var _videoMsgFactory2 = _interopRequireDefault(_videoMsgFactory);

var _lottery_Utils = require("../../Core/Tools/lottery_Utils");

var _lottery_Utils2 = _interopRequireDefault(_lottery_Utils);

var _lottery_animCom = require("../animCom/lottery_animCom");

var _lottery_animCom2 = _interopRequireDefault(_lottery_animCom);

var _lottery_lotteryData = require("../../Data/lottery_lotteryData");

var _lottery_lotteryData2 = _interopRequireDefault(_lottery_lotteryData);

var _timers = require("timers");

var _lottery_videoCom = require("../videoCom/lottery_videoCom");

var _lottery_videoCom2 = _interopRequireDefault(_lottery_videoCom);

var _lottery_EventDefine = require("../../Data/lottery_EventDefine");

var _lottery_MsgStation = require("./Data/lottery_MsgStation");

var _lottery_MsgStation2 = _interopRequireDefault(_lottery_MsgStation);

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
//考虑再拆分成小类,当前写法下每一个阶段一个函数，每个函数中有大量的修改界面的代码
//只有按照正确的顺序执行 才能正常的显示

var lottery_videoFlow = (_dec = property([cc.VideoPlayer]), _dec2 = property([cc.Node]), _dec3 = property(cc.Node), _dec4 = property(_lottery_animCom2.default), _dec5 = property(cc.Animation), _dec6 = property([cc.Animation]), _dec7 = property(_lottery_videoCom2.default), _dec8 = property([cc.Sprite]), ccclass(_class = (_class2 = function (_cc$Component) {
    _inherits(lottery_videoFlow, _cc$Component);

    function lottery_videoFlow() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_videoFlow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_videoFlow.__proto__ || Object.getPrototypeOf(lottery_videoFlow)).call.apply(_ref, [this].concat(args))), _this), _this.msgFuncDefine = ['firstStage', 'secondStage', 'thirdStage', 'fourStage', 'fiveStage', 'sixStage', 'waitStage'], _initDefineProp(_this, "videoArr", _descriptor, _this), _initDefineProp(_this, "qiShuArr", _descriptor2, _this), _initDefineProp(_this, "nodeItem", _descriptor3, _this), _initDefineProp(_this, "littleCom", _descriptor4, _this), _initDefineProp(_this, "startLottery", _descriptor5, _this), _initDefineProp(_this, "balls", _descriptor6, _this), _initDefineProp(_this, "videoStream", _descriptor7, _this), _initDefineProp(_this, "countDownArr", _descriptor8, _this), _this.msgList = [], _this.totalTime = 60, _this.nowMsgPos = 0, _this.isPlayCountDown = false, _temp), _possibleConstructorReturn(_this, _ret);
    }
    //定义的收到消息后的方法
    //视频合集


    //播放队列

    //播放总时长秒

    //当前顺序

    //是否播放倒计时

    /**上一阶段的结束后执行的操作*/


    _createClass(lottery_videoFlow, [{
        key: "start",
        value: function start() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.videoArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var one = _step.value;

                    one.node.on('completed', this.animFinshCallBack.bind(this));
                    one.node.active = false;
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

            var arr = document.getElementsByClassName('cocosVideo');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _one = _step2.value;

                    _one.muted = true;
                    _one.style.zIndex = '-1';
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.videoStream.node.opacity = 0;
            this.videoStream.init(null, true);
            cc.systemEvent.on(_lottery_EventDefine.lottery_EventDefine.VIDEOFLOW.RESTART, this.startPlay, this);
        }

        /**
         * 开始播放
         */

    }, {
        key: "startPlay",
        value: function startPlay() {
            this.msgList = _videoMsgFactory2.default.ins().msgList;
            this.animFinshCallBack();
        }

        /**
         * 结束播放
         */

    }, {
        key: "stopPlay",
        value: function stopPlay() {
            this.videoStream.pause();
        }
        /*--------------------------------------------播放阶段设置--------------------------------------------- */
        //每一阶段结束回调,这里的判断条件是单段视频播放完毕，然而存在循环播放的情况，这种写法则会重复调用

    }, {
        key: "animFinshCallBack",
        value: function animFinshCallBack() {
            if (this.isPlayCountDown) {
                this.videoArr[5].play();
                return;
            }
            console.log("某一阶段播放完毕");
            this.unscheduleAllCallbacks();
            this.stageFinsh && this.stageFinsh();
            var obj = this.msgList.shift();
            if (obj) {
                //播放当前
                this[this.msgFuncDefine[obj.type - 1]](obj.data);
            } else {
                console.log('消息队列空了');
                //重新开始
                this.startPlay();
            }
        }
        //片头

    }, {
        key: "firstStage",
        value: function firstStage(time) {
            var _this2 = this;

            //设置期数
            var expect = _lottery_lotteryData2.default.getInstance().expect;
            var nestExpect = _lottery_lotteryData2.default.getInstance().nestExpect;
            this.setQiShu(expect, this.qiShuArr[0], true);
            this.setQiShu(expect, this.qiShuArr[1], false);
            this.setQiShu(nestExpect, this.qiShuArr[2], true);
            //
            this.videoArr[0].node.active = true;
            this.videoArr[0].play();

            this.qiShuArr[0].active = true;
            var anim = this.qiShuArr[0].getComponent(cc.Animation);
            anim.play();

            var timer = void 0;
            if (time) {
                timer = setTimeout(function () {
                    _this2.animFinshCallBack();
                }, time);
            }
            this.stageFinsh = function () {
                anim.stop();
                _this2.qiShuArr[0].active = false;
                _this2.videoArr[0].stop();
                _this2.videoArr[0].node.active = false;
                timer && clearTimeout(timer);
            };
        }
        /**
         * 开奖倒计时
         * @param  index 从第几个开始 
         */

    }, {
        key: "secondStage",
        value: function secondStage() {
            var _this3 = this;

            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            this.videoArr[1].node.active = true;
            this.videoArr[1].currentTime = data >= 10 ? -1 : 10 - data;
            this.videoArr[1].play();
            this.stageFinsh = function () {
                _this3.videoArr[1].stop();
                _this3.videoArr[1].node.active = false;
            };
        }
        /**
         * 开奖进行时 
         */

    }, {
        key: "thirdStage",
        value: function thirdStage() {
            var _this4 = this;

            this.videoStream.node.opacity = 255;
            this.littleCom.node.active = true;
            this.littleCom.setData('startLotteryBg');
            cc.systemEvent.on(_lottery_EventDefine.lottery_EventDefine.VIDEOFLOW.BALLINFO, this.setOneBallFly, this);
            this.littleCom.setFinshCallBack(function () {
                _this4.littleCom.setData('startLotteryBgLoop', 0, true);
                _this4.startLottery.node.active = true;
                _this4.startLottery.play();
                if (_videoMsgFactory2.default.ins().period == 0) {
                    var one = 0;
                    var timer = (0, _timers.setInterval)(function () {
                        if (one >= 2) {
                            (0, _timers.clearInterval)(timer);
                        }
                        _lottery_MsgStation2.default.getInstance().lotteryResults({ index: one++, ballNum: 1 });
                    }, 2000);
                }
            });
            this.stageFinsh = function () {
                _this4.littleCom.node.active = false;
                _this4.videoStream.node.opacity = 0;
                cc.systemEvent.off(_lottery_EventDefine.lottery_EventDefine.VIDEOFLOW.BALLINFO, _this4.setOneBallFly, _this4);
            };
        }
        /**
         * 播放开奖结果
         */

    }, {
        key: "fourStage",
        value: function fourStage(data) {
            var _this5 = this;

            this.videoArr[2].node.active = true;
            this.videoArr[2].play();
            this.balls[0].play('ball_1');
            this.balls[1].play('ball_2');
            this.balls[2].play('ball_3');
            this.startLottery.play('startLottery_qishu');
            this.stageFinsh = function () {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = _this5.balls[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var one = _step3.value;

                        one.node.active = false;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                _this5.videoArr[2].stop();
                _this5.videoArr[2].node.active = false;
                _this5.startLottery.node.active = false;
            };
        }
        /**
         * 播放 ebet3d logo
         */

    }, {
        key: "fiveStage",
        value: function fiveStage(data) {
            var _this6 = this;

            this.videoArr[3].node.active = true;
            this.videoArr[3].play();
            this.stageFinsh = function () {
                _this6.videoArr[3].stop();
                _this6.videoArr[3].node.active = false;
            };
        }
        /**
         * 下期预告
         * @param  time 播放时间
         */

    }, {
        key: "sixStage",
        value: function sixStage(data) {
            var _this7 = this;

            this.videoArr[4].node.active = true;
            this.videoArr[4].play();
            this.qiShuArr[2].active = true;
            var anim = this.qiShuArr[2].getComponent(cc.Animation);
            anim.play();
            this.stageFinsh = function () {
                anim.stop();
                _this7.qiShuArr[2].active = false;
                _this7.videoArr[4].stop();
                _this7.videoArr[4].node.active = false;
            };
        }
        /**
         * 等待状态,
         * time 等待时间
         */

    }, {
        key: "waitStage",
        value: function waitStage(time) {
            var _this8 = this;

            this.isPlayCountDown = true;
            this.videoArr[5].node.active = true;
            this.videoArr[5].play();
            this.countDownArr[0].node.parent.active = true;
            this.setCountDown(time--);
            var timer1 = (0, _timers.setInterval)(function () {
                if (time < 0) {
                    (0, _timers.clearInterval)(timer1);
                    _this8.isPlayCountDown = false;
                    _this8.animFinshCallBack();
                }
                _this8.setCountDown(time--);
                _this8.countDownArr[4].node.active = !_this8.countDownArr[4].node.active;
            }, 1000);
            this.stageFinsh = function () {
                _this8.countDownArr[0].node.parent.active = false;
                _this8.videoArr[5].stop();
                _this8.videoArr[5].node.active = false;
            };
        }
        /*----------------------------------------------相关设置----------------------------------------------*/
        /**
         * 设置当前播放期数
        */

    }, {
        key: "setQiShu",
        value: function setQiShu(str, node) {
            var _this9 = this;

            var isBig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            node.removeAllChildren();
            var arr = (str + '').split('');
            var func = function func(url) {
                var one = cc.instantiate(_this9.nodeItem);
                _lottery_Utils2.default.getInstance().setSprite(one.getComponent(cc.Sprite), url, 'LEDAtlas');
                node.addChild(one);
            };

            if (isBig) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = arr[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var name = _step4.value;

                        func('wz_sz_' + name);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                func('wz_qi');
            } else {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = arr[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _name = _step5.value;

                        func('wz_xsz_' + _name);
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                func('wz_qi_2');
            }
        }
        /**
         * 设置倒计时,最小单位是秒
         */

    }, {
        key: "setCountDown",
        value: function setCountDown() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;

            var minute = Math.floor(time / 60);
            var second = time - minute * 60;
            minute = (minute + '').split('');
            second = (second + '').split('');
            if (minute.length == 1) minute.unshift(0);
            if (second.length == 1) second.unshift(0);
            _lottery_Utils2.default.getInstance().setSprite(this.countDownArr[0], minute[0], 'countDown');
            _lottery_Utils2.default.getInstance().setSprite(this.countDownArr[1], minute[1], 'countDown');
            _lottery_Utils2.default.getInstance().setSprite(this.countDownArr[2], second[0], 'countDown');
            _lottery_Utils2.default.getInstance().setSprite(this.countDownArr[3], second[1], 'countDown');
        }
        /**设置单个球的飞入*/
        //球的坐标

    }, {
        key: "setOneBallFly",
        value: function setOneBallFly(event) {
            var _this10 = this;

            var index = event.detail.index;
            var ballNum = event.detail.openCode;
            _lottery_Utils2.default.getInstance().setSprite(this.balls[index].getComponent(cc.Sprite), 'cq_' + ballNum, 'LEDAtlas');
            this.balls[index].node.active = true;
            this.balls[index].play();
            if (index == 2) {
                console.log("最后一颗球");
                setTimeout(function () {
                    _this10.animFinshCallBack();
                }, 2000);
            }
        }
    }]);

    return lottery_videoFlow;
}(cc.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "videoArr", [_dec], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "qiShuArr", [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeItem", [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "littleCom", [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "startLottery", [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "balls", [_dec6], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "videoStream", [_dec7], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "countDownArr", [_dec8], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
})), _class2)) || _class);
exports.default = lottery_videoFlow;
module.exports = exports["default"];

cc._RF.pop();