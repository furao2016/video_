(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/UI/view_login/lottery_loginViewCtr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4614c+qU1RG4bcvRIPulV/n', 'lottery_loginViewCtr', __filename);
// Scripts/UI/view_login/lottery_loginViewCtr.js

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

var lottery_loginViewCtr = function (_ViewCtrBase) {
    _inherits(lottery_loginViewCtr, _ViewCtrBase);

    function lottery_loginViewCtr() {
        _classCallCheck(this, lottery_loginViewCtr);

        var _this = _possibleConstructorReturn(this, (lottery_loginViewCtr.__proto__ || Object.getPrototypeOf(lottery_loginViewCtr)).call(this));

        _this.Init();
        return _this;
    }

    _createClass(lottery_loginViewCtr, [{
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
            this.moduleName = "loginPre";
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
            return new lottery_loginViewCtr();
        }
    }]);

    return lottery_loginViewCtr;
}(_lottery_viewCtrBase2.default);

exports.default = lottery_loginViewCtr;
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
        //# sourceMappingURL=lottery_loginViewCtr.js.map
        