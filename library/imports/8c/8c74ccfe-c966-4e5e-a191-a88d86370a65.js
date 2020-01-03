"use strict";
cc._RF.push(module, '8c74cz+yWZOXqGRqI2GNwpl', 'lottery_RunInBackground');
// Scripts/Manager/lottery_RunInBackground.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
后台切入切出相关  切到后台 回调参数 false 切入 true
*/
var runCallback = {};

var RunInBackground = function (_SingletonBase) {
    _inherits(RunInBackground, _SingletonBase);

    function RunInBackground() {
        _classCallCheck(this, RunInBackground);

        return _possibleConstructorReturn(this, (RunInBackground.__proto__ || Object.getPrototypeOf(RunInBackground)).call(this));
    }

    _createClass(RunInBackground, [{
        key: "_onDestroyObject",
        value: function _onDestroyObject() {
            cc.game.off(cc.game.EVENT_HIDE, this._goToBackground, this);
            cc.game.off(cc.game.EVENT_SHOW, this._goToFront, this);
        }
    }, {
        key: "_goToBackground",
        value: function _goToBackground() {
            this.CallRunCallback(false);
        }
    }, {
        key: "_goToFront",
        value: function _goToFront() {
            this.CallRunCallback(true);
        }
    }, {
        key: "CallRunCallback",
        value: function CallRunCallback(focus) {
            for (var key in runCallback) {
                var element = runCallback[key];
                element(focus);
            }
        }
        /*--------------------------------对外接口-----------------------*/

    }, {
        key: "RegestRunInBackground",
        value: function RegestRunInBackground(tag, callback, self) {
            runCallback[tag] = self ? callback.bind(self) : callback;
        }
    }, {
        key: "UnregestRunInBackground",
        value: function UnregestRunInBackground(tag) {
            if (runCallback[tag]) delete runCallback[tag];
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            var _instance = new RunInBackground();
            cc.game.on(cc.game.EVENT_HIDE, _instance._goToBackground, _instance);
            cc.game.on(cc.game.EVENT_SHOW, _instance._goToFront, _instance);
            return _instance;
        }
    }]);

    return RunInBackground;
}(_SingletonBase3.default);

module.exports = RunInBackground;

cc._RF.pop();