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