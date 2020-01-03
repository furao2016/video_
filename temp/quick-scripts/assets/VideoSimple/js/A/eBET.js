(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/VideoSimple/js/A/eBET.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '64454RuMd5BdJMnw81rBbtX', 'eBET', __filename);
// VideoSimple/js/A/eBET.js

"use strict";

window.ebet = {};
ebet.baccarat = {};
ebet.NetworkStatistics = function (byteRate) {
    this.startTime = new Date();
    this.totalBytes = 0;
    this.currentBytes = 0;
    this._byteRate = byteRate;
};

var proto = ebet.NetworkStatistics.prototype;

proto.reset = function () {
    this.startTime = new Date();
    this.totalBytes = 0;
    this.currentBytes = 0;
};

proto.receiveBytes = function (bytes) {
    this.currentBytes += bytes;
    this.totalBytes += bytes;
};

/**
 * 获取网络的状态
 * @param {Number} second
 */
proto.getNetworkStatus = function (second) {
    second = second || 1;
    var bytes = this.currentBytes;
    this.currentBytes = 0;
    return bytes / (this._byteRate * second);
};
ebet.videoSize = {
    width: 864,
    height: 480
};

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
        //# sourceMappingURL=eBET.js.map
        