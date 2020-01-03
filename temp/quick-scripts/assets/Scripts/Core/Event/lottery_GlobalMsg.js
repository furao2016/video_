(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Core/Event/lottery_GlobalMsg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '034c1NR1WpKFqKEkHhf9DFr', 'lottery_GlobalMsg', __filename);
// Scripts/Core/Event/lottery_GlobalMsg.js

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

/**
 * 消息处理中心
 * 当前是同步机制
 */
var GlobalMsg = function (_SingletonBase) {
    _inherits(GlobalMsg, _SingletonBase);

    function GlobalMsg() {
        _classCallCheck(this, GlobalMsg);

        var _this = _possibleConstructorReturn(this, (GlobalMsg.__proto__ || Object.getPrototypeOf(GlobalMsg)).call(this));

        _this.m_Callbacks = {};
        return _this;
    }

    _createClass(GlobalMsg, [{
        key: "_onDestroyObject",
        value: function _onDestroyObject() {
            this.m_Callbacks = {};
        }
        /**注册单个监听 */

    }, {
        key: "Register",
        value: function Register(msgkey, callback, uuid) {
            try {
                if (this.m_Callbacks[msgkey] == null) {
                    this.m_Callbacks[msgkey] = [];
                }
                this.m_Callbacks[msgkey].push({
                    "callback": callback,
                    "uuid": uuid
                }); //数组，同一个脚本，可能注册多次
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
        /**注销监听
         * 如果传入UUID 则注销单个监听 如果uuid为空 则注销 整个 msgkey的监听
        */

    }, {
        key: "Unregister",
        value: function Unregister(msgkey, uuid) {
            try {
                if (this.m_Callbacks[msgkey] == null) {
                    cc.log("Unregister " + msgkey + " failed! case it is null!");
                    return;
                }
                if (uuid) {
                    for (var index = 0; index < this.m_Callbacks[msgkey].length; index++) {
                        var element = this.m_Callbacks[msgkey][index];
                        if (element.uuid == uuid) {
                            this.m_Callbacks[msgkey].splice(index, 1);
                            break;
                        }
                    }
                } else {
                    delete this.m_Callbacks[msgkey];
                }
            } catch (error) {
                cc.log(cc.js.getClassName(this) + ":" + error.message);
            }
        }
        /**
         * 发送消息，msgkey 消息key值
         * args 需要传递的参数 自定义数据结构
         */

    }, {
        key: "Send",
        value: function Send(msgkey, args) {
            if (this.m_Callbacks[msgkey] == null) {
                cc.log("this.m_Callbacks[msgkey] == null:" + msgkey + "---------------------------------");
                return;
            }
            for (var index = 0; index < this.m_Callbacks[msgkey].length; index++) {
                var element = this.m_Callbacks[msgkey][index];
                if (element.callback) {
                    element.callback(args);
                }
            }
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            return new GlobalMsg();
        }
    }]);

    return GlobalMsg;
}(_SingletonBase3.default);

exports.default = GlobalMsg;
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
        //# sourceMappingURL=lottery_GlobalMsg.js.map
        