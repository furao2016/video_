(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Core/Timer/lottery_TimeMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd970b3lD4dBTopig9yDZ6He', 'lottery_TimeMgr', __filename);
// Scripts/Core/Timer/lottery_TimeMgr.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("../../Singleton/SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
计时器管理类
*/
var TimerManager = function (_SingletonBase) {
    _inherits(TimerManager, _SingletonBase);

    function TimerManager() {
        _classCallCheck(this, TimerManager);

        var _this = _possibleConstructorReturn(this, (TimerManager.__proto__ || Object.getPrototypeOf(TimerManager)).call(this));

        _this.timerList = [];
        _this.timerID = 0;
        _this.isOpenTimer = false;
        _this.timerIndex = false;
        _this.activeTimerIDDic = {};
        _this.intervalID = 0;
        _this.intervalTime = 0;
        return _this;
    }

    _createClass(TimerManager, [{
        key: "_onDestroyObject",
        value: function _onDestroyObject() {
            clearInterval(this.intervalID);
            this.clearTimer();
        }
    }, {
        key: "updateTimer",
        value: function updateTimer() {
            if (!this.isOpenTimer) return;
            this.timerIndex = this.timerList.length - 1;
            for (; this.timerIndex >= 0; this.timerIndex--) {
                var timerobj = this.timerList[this.timerIndex];
                if (timerobj.isPause) continue;
                timerobj.timer += this.intervalTime;
                if (timerobj.timer >= timerobj.delay) {
                    timerobj.callback();
                    timerobj.repeat--;
                    if (!timerobj.isEndless && timerobj.repeat <= 0) {
                        this.timerList.splice(this.timerIndex, 1);
                        if (this.timerList.length <= 0) {
                            this.isOpenTimer = false;
                        }
                    } else {
                        timerobj.timer = timerobj.timer - timerobj.interval;
                    }
                }
            }
        }
        /*
        获取计时器ID，内部调用 计算方式有待优化
        */

    }, {
        key: "getTimerID",
        value: function getTimerID() {
            this.timerID = this.timerID + 1;
            if (this.timerID >= 999999999) this.timerID = 1;
            while (this.activeTimerIDDic[this.timerID]) {
                this.timerID = this.timerID + 1;
                if (this.timerID >= 999999999) this.timerID = 1;
            }
            return this.timerID;
        }
        /*
        打开一个计时器
        callback 回调函数
        interval 间隔时间
        repeat 重复次数 <=0 无限次数 >0 重复repeat次
        delay 延时时间
        self 注册对象
          return 计时器的ID
        */

    }, {
        key: "openTimer",
        value: function openTimer(callback, interval, repeat, delay, self) {
            var timer = {
                "id": this.getTimerID(),
                "callback": callback.bind(self),
                "interval": interval,
                "repeat": repeat,
                "curRepeat": repeat,
                "delay": delay,
                "isEndless": repeat > 0 ? false : true,
                "timer": 0,
                "isPause": false
            };
            if (repeat <= 0) {
                this.activeTimerIDDic[timer.id] = true;
            }
            this.timerList.push(timer);
            if (!this.isOpenTimer) this.isOpenTimer = true;
            return timer.id;
        }
        /*
        关闭一个计时器
        */

    }, {
        key: "closeTimer",
        value: function closeTimer(id) {
            this.timerIndex = this.timerList.length - 1;
            for (; this.timerIndex >= 0; this.timerIndex--) {
                var timerobj = this.timerList[this.timerIndex];
                if (timerobj.id === id) {
                    this.timerList.splice(this.timerIndex, 1);
                    break;
                }
            }
            if (this.activeTimerIDDic[id]) {
                delete this.activeTimerIDDic[id];
            }
        }
        /*
        暂停一个计时器
        */

    }, {
        key: "pauseTimer",
        value: function pauseTimer(id) {
            this.timerIndex = this.timerList.length - 1;
            for (; this.timerIndex >= 0; this.timerIndex--) {
                var timerobj = this.timerList[this.timerIndex];
                if (timerobj.id === id) {
                    timerobj.isPause = true;
                }
            }
        }
        /*
        恢复一个计时器
        */

    }, {
        key: "resumeTimer",
        value: function resumeTimer(id) {
            this.timerIndex = this.timerList.length - 1;
            for (; this.timerIndex >= 0; this.timerIndex--) {
                var timerobj = this.timerList[this.timerIndex];
                if (timerobj.id === id) {
                    timerobj.isPause = false;
                }
            }
        }
        /*
        重置一个计时器主要是把计时增量置0，重新开始计时，有次数限制的 重置次数，达到复用的目的
        重置计时器的各项数据  不传入的为之前的默认值
        */

    }, {
        key: "resetTImer",
        value: function resetTImer(id, delay, repeat, interval) {
            this.timerIndex = this.timerList.length - 1;
            for (; this.timerIndex >= 0; this.timerIndex--) {
                var timerobj = this.timerList[this.timerIndex];
                if (timerobj.id === id) {
                    timerobj.repeat = repeat ? repeat : timerobj.curRepeat;
                    timerobj.timer = 0;
                    timerobj.delay = delay ? delay : timerobj.delay;
                    timerobj.interval = interval ? interval : timerobj.interval;
                }
            }
        }
    }, {
        key: "clearTimer",
        value: function clearTimer() {
            this.isOpenTimer = false;
            this.timerList = [];
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            var instance = new TimerManager();
            instance.intervalTime = 1 / cc.game.config.frameRate;
            instance.intervalID = setInterval(instance.updateTimer.bind(instance), instance.intervalTime * 1000);
            return instance;
        }
    }]);

    return TimerManager;
}(_SingletonBase3.default);

exports.default = TimerManager;
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
        //# sourceMappingURL=lottery_TimeMgr.js.map
        