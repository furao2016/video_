"use strict";
cc._RF.push(module, 'f15eby+4WRKSav4FU+tqeCy', 'videoMsgFactory');
// Scripts/UI/view_videoSys/videoMsgFactory.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var videoStageTime = [16, 10,, 8, 7, 10]; //16+10+8+7+10 = 51秒
//消息工厂,想把监听也放在这里,不知道对不对

var videosMsgFatory = function () {
    function videosMsgFatory() {
        _classCallCheck(this, videosMsgFatory);

        this.stanardFlow = [[1], [2], [3], [4], [5], [6, 7]];
        this._msgList = [];
        this.period = -1;
    }

    _createClass(videosMsgFatory, [{
        key: "firstToDay",
        // -1第一期 0 常规期 1 最后一期
        /**第一期开盘特殊处理 */
        value: function firstToDay() {
            this._msgList = this.anlyArr([[1, 10000]]);
        }
        /**最后一期开盘特殊处理*/

    }, {
        key: "endToDay",
        value: function endToDay() {
            this._msgList = [];
        }
        /**常规期处理*/

    }, {
        key: "commonToDay",
        value: function commonToDay() {
            this._msgList = this.anlyArr(this.stanardFlow);
        }
        /**获取消息队列*/

    }, {
        key: "anlyArr",

        /**分析数组 */
        value: function anlyArr() {
            var arr = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arguments[0][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var one = _step.value;

                    arr.push(new videosMsg(one[0], one[1]));
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

            return arr;
        }
        /**切换期数*/

    }, {
        key: "changePeriod",
        value: function changePeriod(data) {
            this.period = data;
        }
    }, {
        key: "msgList",
        get: function get() {
            switch (this.period) {
                case -1:
                    this.firstToDay();
                    break;
                case 0:
                    this.commonToDay();
                    break;
                case 1:
                    this.endToDay();
                    break;
                default:
                    this._msgList = [];
                    break;
            }
            return this._msgList;
        }
        /**设置倒计时*/

    }, {
        key: "countDownTime",
        set: function set(time) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._msgList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var one = _step2.value;

                    if (one.type == 2) {
                        one.data = time;
                        return;
                    }
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

            console.log("没有倒计时序列？？？程序已经错了");
        }
    }], [{
        key: "ins",
        value: function ins() {
            if (!this._root) this._root = new videosMsgFatory();
            return this._root;
        }

        //标准流程

        //数组队列

        //当前期类型

    }]);

    return videosMsgFatory;
}();

//单个视频消息


exports.default = videosMsgFatory;

var videosMsg = //数据
function videosMsg(type, data) {
    _classCallCheck(this, videosMsg);

    this.type = type;
    this.data = data;
} //类型
;

module.exports = exports["default"];

cc._RF.pop();