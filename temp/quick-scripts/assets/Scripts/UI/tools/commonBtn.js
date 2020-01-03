(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/UI/tools/commonBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9a72u8Ws9I6o36DGemCV3K', 'commonBtn', __filename);
// Scripts/UI/tools/commonBtn.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commonBtn = function () {
    function commonBtn(node, downCallback) {
        _classCallCheck(this, commonBtn);

        this.isSelect = false;
        this.downCallback = null;

        this.node = node;
        this.defaultNode = cc.find('default', this.node);
        this.selectNode = cc.find('select', this.node);
        this.downCallback = downCallback;
    }
    //按下回调


    _createClass(commonBtn, [{
        key: 'select',
        value: function select(is) {
            this.selectNode.active = is;
            this.defaultNode.active = !is;
            this.isSelect = is;
        }
    }]);

    return commonBtn;
}();

/**
 * 按下后，弹起的按钮
 */


exports.default = commonBtn;

var radioBtn = exports.radioBtn = function (_commonBtn) {
    _inherits(radioBtn, _commonBtn);

    function radioBtn(node, downCallback) {
        _classCallCheck(this, radioBtn);

        var _this = _possibleConstructorReturn(this, (radioBtn.__proto__ || Object.getPrototypeOf(radioBtn)).call(this, node, downCallback));

        _this.node.on(cc.Node.EventType.TOUCH_START, _this.touchStart, _this);
        _this.node.on(cc.Node.EventType.TOUCH_CANCEL, _this.touchCancle, _this);
        _this.node.on(cc.Node.EventType.TOUCH_END, _this.touchEnd, _this);
        return _this;
    }

    _createClass(radioBtn, [{
        key: 'touchStart',
        value: function touchStart() {
            this.select(true);
        }
    }, {
        key: 'touchCancle',
        value: function touchCancle() {
            this.select(false);
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd() {
            this.select(false);
            this.downCallback && this.downCallback();
        }
    }]);

    return radioBtn;
}(commonBtn);
/**
 * 按下后不弹起的按钮，当前组其他按钮按下，才弹起
 */


var groupBtn = exports.groupBtn = function (_commonBtn2) {
    _inherits(groupBtn, _commonBtn2);

    function groupBtn(node, downCallback, group) {
        _classCallCheck(this, groupBtn);

        var _this2 = _possibleConstructorReturn(this, (groupBtn.__proto__ || Object.getPrototypeOf(groupBtn)).call(this, node, downCallback));

        _this2.group = null;

        _this2.node.on(cc.Node.EventType.TOUCH_END, _this2.touchEnd, _this2);
        _this2.group = group;
        return _this2;
    }

    _createClass(groupBtn, [{
        key: 'touchEnd',
        value: function touchEnd() {
            if (this.isSelect) {
                this.select(false);
                this.group.index = null;
            } else {
                this.select(true);
                var index = this.group.arr.indexOf(this);
                if (this.group.index != null) {
                    this.group.arr[this.group.index].select(false);
                }
                this.group.index = index;
                this.downCallback && this.downCallback();
            }
        }
    }]);

    return groupBtn;
}(commonBtn);

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
        //# sourceMappingURL=commonBtn.js.map
        