(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Core/Net/lottery_SocketEnum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dd672IdqHhF86NMFXS6dy8k', 'lottery_SocketEnum', __filename);
// Scripts/Core/Net/lottery_SocketEnum.js

"use strict";

/**
 * socket链接的状态枚举
 */
var SocketEnum = cc.Enum({
    none: 0, //占位
    success: 1, //连接成功
    error: 2, //连接错误
    close: 3 //连接关闭
});

module.exports = SocketEnum;

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
        //# sourceMappingURL=lottery_SocketEnum.js.map
        