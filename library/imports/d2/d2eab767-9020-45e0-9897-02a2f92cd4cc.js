"use strict";
cc._RF.push(module, 'd2eabdnkCBF4JiXAqL5LNTM', 'lottery_VideoSysCtr');
// Scripts/UI/view_videoSys/lottery_VideoSysCtr.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lottery_viewCtrBase = require("../lottery_viewCtrBase");

var _lottery_viewCtrBase2 = _interopRequireDefault(_lottery_viewCtrBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lottery_VideoSysCtr = function (_ViewCtrBase) {
    _inherits(lottery_VideoSysCtr, _ViewCtrBase);

    function lottery_VideoSysCtr() {
        _classCallCheck(this, lottery_VideoSysCtr);

        var _this = _possibleConstructorReturn(this, (lottery_VideoSysCtr.__proto__ || Object.getPrototypeOf(lottery_VideoSysCtr)).call(this));

        _this.Init();
        return _this;
    }

    _createClass(lottery_VideoSysCtr, [{
        key: "AddEvent",
        value: function AddEvent() {}
    }, {
        key: "RemoveEvent",
        value: function RemoveEvent() {}
    }, {
        key: "_OnMessageHandle",
        value: function _OnMessageHandle(data) {
            var _data = data;
            /*
            TODO:处理消息然后返回给OnMessageHandle 往view层发送
            */
            return _data;
        }
    }, {
        key: "OnInit",
        value: function OnInit() {
            this.moduleName = "videoSysPre";
        }
    }, {
        key: "OnOpen",
        value: function OnOpen() {}
    }, {
        key: "OnClose",
        value: function OnClose() {}
    }, {
        key: "OnDestroy",
        value: function OnDestroy() {}
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new lottery_VideoSysCtr();
        }
    }]);

    return lottery_VideoSysCtr;
}(_lottery_viewCtrBase2.default);

exports.default = lottery_VideoSysCtr;
module.exports = exports["default"];

cc._RF.pop();