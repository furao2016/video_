"use strict";
cc._RF.push(module, 'dd672IdqHhF86NMFXS6dy8k', 'lottery_SocketEnum');
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