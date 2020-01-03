(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Data/lottery_animDataMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9656dWpypdDY6LABBUL88zL', 'lottery_animDataMgr', __filename);
// Scripts/Data/lottery_animDataMgr.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require('../Singleton/SingletonBase');

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 浏览器存在内存限制 32位为1.0GB,64位为1.4GB,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 播放当前视频的时候,至少得把下一阶段的视频加载完毕。//->已更换播放方式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var lottery_animDataMgr = function (_SingletonBase) {
    _inherits(lottery_animDataMgr, _SingletonBase);

    function lottery_animDataMgr() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, lottery_animDataMgr);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = lottery_animDataMgr.__proto__ || Object.getPrototypeOf(lottery_animDataMgr)).call.apply(_ref, [this].concat(args))), _this), _this.resDir = {}, _this.resUrl = 'Altas/little/', _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(lottery_animDataMgr, [{
        key: 'init',

        //数据目录初始化
        value: function init(progressCallBack, callback) {
            var _this2 = this;

            cc.loader.loadResDir(this.resUrl, cc.SpriteFrame, progressCallBack, function (err, objects, urls) {
                if (err) {
                    console.log('错误', err);
                    return;
                }
                for (var index = 0, length = urls.length; index < length; index++) {
                    var one = urls[index].split('/');
                    var name = one[one.length - 2];
                    !_this2.resDir[name] && (_this2.resDir[name] = []);
                    _this2.resDir[name].push(objects[index]);
                }
                callback && callback();
                console.log(_this2.resUrl, '加载完毕');
            });
        }
        /*------------------------------------------对某个目录的处理------------------------------- */
        //加载某个阶段的视频

    }, {
        key: 'loadResDir',
        value: function loadResDir(urlName, progressCallBack, callback) {}
        // if (this.resDir[urlName] && this.resDir[urlName].length) return;

        //释放某个阶段的视频

    }, {
        key: 'releaseResDir',
        value: function releaseResDir(url) {
            cc.loader.releaseResDir(this.resUrl + url);
            this.resDir[url].length = 0;
        }
    }], [{
        key: '_onNewObject',
        value: function _onNewObject() {
            var one = new lottery_animDataMgr();
            return one;
        }
    }]);

    return lottery_animDataMgr;
}(_SingletonBase3.default);

exports.default = lottery_animDataMgr;
module.exports = exports['default'];

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
        //# sourceMappingURL=lottery_animDataMgr.js.map
        