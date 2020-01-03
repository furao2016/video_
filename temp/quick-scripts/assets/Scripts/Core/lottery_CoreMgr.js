(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Core/lottery_CoreMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cbad6kKNv1JpoOehhoYtuUM', 'lottery_CoreMgr', __filename);
// Scripts/Core/lottery_CoreMgr.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoreMgr = (_temp = _class = function () {
    function CoreMgr() {
        _classCallCheck(this, CoreMgr);
    }

    _createClass(CoreMgr, null, [{
        key: "RegisterSingleton",
        value: function RegisterSingleton(singleton) {
            this.singletonList.push(singleton);
        }
    }, {
        key: "Destroy",
        value: function Destroy() {
            for (var index = 0; index < this.singletonList.length; index++) {
                var element = this.singletonList[index];
                element.destroyInstance();
            }
        }
    }]);

    return CoreMgr;
}(), _class.singletonList = [], _temp);
exports.default = CoreMgr;
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
        //# sourceMappingURL=lottery_CoreMgr.js.map
        