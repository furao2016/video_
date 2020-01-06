"use strict";
cc._RF.push(module, '3a25ejkyPJAeYuwhgger7cr', 'lottery_lotteryData');
// Scripts/Data/lottery_lotteryData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("../Singleton/SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lottery_lotteryData = function (_SingletonBase) {
    _inherits(lottery_lotteryData, _SingletonBase);

    function lottery_lotteryData() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_lotteryData);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_lotteryData.__proto__ || Object.getPrototypeOf(lottery_lotteryData)).call.apply(_ref, [this].concat(args))), _this), _this.userId = null, _this.userName = null, _this.roleList = null, _this.lotteryCode = null, _this.expect = 1115, _this.nestExpect = 1116, _this.awardTime = 0, _this.awardResult = [1, 2, 3], _temp), _possibleConstructorReturn(_this, _ret);
    }
    //用户ID

    //用户名字

    //可选彩种列表

    //所选择的彩种code

    //当前彩票期数

    //下一期

    //指定的开奖时间

    //开奖结果


    _createClass(lottery_lotteryData, [{
        key: "updataData",
        value: function updataData(data) {
            for (var one in data) {
                if (this.hasOwnProperty(one)) this[one] = data[one];
            }
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            var one = new lottery_lotteryData();
            return one;
        }
    }]);

    return lottery_lotteryData;
}(_SingletonBase3.default);

exports.default = lottery_lotteryData;
module.exports = exports["default"];

cc._RF.pop();