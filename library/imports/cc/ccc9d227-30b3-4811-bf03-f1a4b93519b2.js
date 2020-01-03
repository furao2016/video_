"use strict";
cc._RF.push(module, 'ccc9dInMLNIEb8D8aS5NRmy', 'lottery_helper');
// Scripts/UI/tools/lottery_helper.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require('../../Singleton/SingletonBase');

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_BaseResLoad = require('../../Core/ResHandle/lottery_BaseResLoad');

var _lottery_BaseResLoad2 = _interopRequireDefault(_lottery_BaseResLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 项目的辅助脚本，理应只提供辅助类的函数
 */
var Helper = function (_SingletonBase) {
    _inherits(Helper, _SingletonBase);

    function Helper() {
        _classCallCheck(this, Helper);

        return _possibleConstructorReturn(this, (Helper.__proto__ || Object.getPrototypeOf(Helper)).apply(this, arguments));
    }

    _createClass(Helper, [{
        key: 'showTips',

        /**
         *  浮动提示
         * @param content
         */
        value: function showTips(content) {
            var _this2 = this;

            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            // content = cc.lottery.LanguageManager.GetLanguageText(content);
            if (this.tipsLayer) {
                this.tipsLayer.showTips(content, type);
            } else {
                this.addPrefabToNode("Prefab/tipsLayer", cc.find("Canvas"), 1000, function (node) {
                    _this2.tipsLayer = node.getComponent("lottery_tipsLayer");
                    _this2.tipsLayer.showTips(content, type);
                });
            }
        }
        /**
         * 显示加载动画
         * @param {*} isClose 
         */

    }, {
        key: 'showLoading',
        value: function showLoading() {
            var _this3 = this;

            var isPlay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (!isPlay) {
                this.loadingLayer && this.loadingLayer.stopPlay();
            } else if (this.loadingLayer) this.loadingLayer.startPlay();else {
                this.addPrefabToNode("Prefab/loadingLayer", cc.find("Canvas"), 1000, function (node) {
                    _this3.loadingLayer = node.getComponent('lottery_loadingTip');
                    _this3.loadingLayer.startPlay();
                });
            }
        }
        /**
        * 挂在预制资源到指定节点
        * @param prefabUrl
        * @param targetNode  挂在到的节点
        * @param zIndex      层级
        * @param completeCallBack  成功回掉
        */

    }, {
        key: 'addPrefabToNode',
        value: function addPrefabToNode(prefabUrl) {
            var targetNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cc.director.getScene();
            var zIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var completeCallBack = arguments[3];


            var resFun = function resFun(err, prefab) {
                if (err) {
                    cc.lottery.AppLogMgr.log("addPrefabToNode func load " + prefabUrl + " err");
                    return;
                }

                var node = cc.instantiate(prefab);
                targetNode.addChild(node, zIndex);
                if (completeCallBack) {
                    completeCallBack(node);
                }
            };

            _lottery_BaseResLoad2.default.getInstance().LoadByKey(prefabUrl, prefabUrl, resFun);
        }
    }], [{
        key: '_onNewObject',
        value: function _onNewObject() {
            var _instance = new Helper();
            _instance.Res = {};
            _instance.TipsLayer = null; // 缓存tipslayer
            return _instance;
        }
    }]);

    return Helper;
}(_SingletonBase3.default);

exports.default = Helper;
module.exports = exports['default'];

cc._RF.pop();