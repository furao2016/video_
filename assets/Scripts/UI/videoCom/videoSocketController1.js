/**************************************************************************
 * Copyright (C) 2015 ebet.com, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by ebet.com
 **************************************************************************/
var lottery = {};
lottery.video = {};
window['lottery'] = lottery;
(function (baccarat) {
  //connection status
  var state = true;
  var decodeWorkerUrl = "lib/H264Decoder.js";
  var WEBSOCKET_HEADER_TYPE_VIDEO = 0x01;
  var WEBSOCKET_HEADER_TYPE_AUDIO = 0x02;
  var WEBSOCKET_HEADER_TYPE_UNDEFINED = 0x00;
  var WEBSOCKET_HEADER_TYPE_STATUS = 0xff;
  var TIME_INTERVAL = 30;
  /**
   * The video WebSocket handler
   * WebWorker的使用
   * @constructor
   */
  baccarat.VideoSocketController = function (url, useWorker, webgl) {
    var self = this;
    this._currentUrl = url;

    this._currentFPS = VIDEO_FPS;
    this.audioPlayer = AV.Player.fromBufferSource();
    //播放定時器
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(function () {
      self.decodeFromQueueTimer();
    }, TIME_INTERVAL);
    // this.audioPlayer.play();
    this._useWorker = (useWorker === undefined) ? baccarat.USE_WORKER :
      useWorker;
    this._useGL = (webgl === undefined) ? (cc._renderType === cc._RENDER_TYPE_WEBGL) :
      webgl;
    this.reuseMemory = false; //
    this.transferMemory = false;
    this._lastBuffer = null;
    this._lastTimestamp = null;
    this._decoder = new Decoder({
      "rgb": !this._useGL,
      "reuseMemory": this.reuseMemory
    }); //for closure compiler

    this._statistics = new ebet.NetworkStatistics(300 * 1000 / 8); //bit rate: 307kb

    //this._client = new WebSocket(url, ["video", "audio"]);
    this._client = new WebSocket(url);
    this._client.onopen = onOpenCallback.bind(this);
    this._client.onerror = onErrorCallback.bind(this);
    this.onOpen = null;
    this.onClose = null;
    this.onError = null;

    this._decodeVideo = null;
    this._videoCache = [];
    this.onPictureDecoded = null;
    this._packageCache = null;
    this._setupWorker();
  };

  // the callback of the socket
  var onOpenCallback = function (event) {
    // cc.log('socket open video')
    this._client.binaryType = "arraybuffer";
    this._client.onmessage = onMessageCallback.bind(this);
    this._client.onclose = onCloseCallback.bind(this);

    if (this.onOpen)
      this.onOpen(event);
  };
  var onCloseCallback = function (event) {
    cc.log("The video WebSocket connection has been closed.");
    console.log(event.currentTarget.url, this._currentUrl)
    if (this.onClose)
      this.onClose(event);
  };
  var onMessageCallback = function (event) {
    var messageData = new Uint8Array(event.data);
    var header = this.WSHeader(messageData);
    var ts;
    if (header.type !== WEBSOCKET_HEADER_TYPE_UNDEFINED) {
      ts = this.intFromBytes(messageData.subarray(8, 12));
      this._statistics.receiveBytes(messageData.length);
      messageData = new Uint8Array(event.data, 12, messageData.length - 12);
    }
    // cc.log(messageData)
    // cc.log(this._lastBuffer)
    switch (header.type) {
      case WEBSOCKET_HEADER_TYPE_VIDEO:
        //使用队列方式处理
        //H264
        if (messageData[0] === 0 && messageData[1] === 0 && messageData[2] ===
          0 && messageData[3] === 1) {
          if (this._lastBuffer) {
            this._decodeVideo(this._lastTimestamp, this._lastBuffer);
          }
          this._lastBuffer = messageData;
          this._lastTimestamp = ts;
        } else {
          cc.log("receive a split data");
          var newBuffer = new Uint8Array(this._lastBuffer.length +
            messageData.length);
          newBuffer.set(this._lastBuffer);
          newBuffer.set(messageData, this._lastBuffer.length);
          this._decodeVideo(ts, newBuffer);
          this._lastBuffer = null;
        }
        break;
      case WEBSOCKET_HEADER_TYPE_AUDIO:
        //if (!cc.sys.isMobile)
        //    this.audioPlayer.asset.source.add(messageData);
        this._packageCache.pushAAC(ts, messageData);
        break;
      case WEBSOCKET_HEADER_TYPE_STATUS:
        var msg = String.fromCharCode.apply(String, messageData);
        //this._packageCache.lastPlayedTimestamp = 0;
        switch (msg) {
          //reset buffer
          case "video streaming server error.":
            this._lastBuffer = false;
            break;
        }
        break;
    }
  };

  var onErrorCallback = function (event) {
    cc.log("the video connection has an error", event);
    if (this.onError)
      this.onError(event);
  };

  var proto = baccarat.VideoSocketController.prototype;

  proto.recycleMemory = function () { };
  proto.WSHeader = function (data) {
    var header = {
      type: WEBSOCKET_HEADER_TYPE_UNDEFINED,
      size: 0
    };
    if (data[0] === 0x55 && data[1] === 0x47 && data[2] === 0x49) {
      switch (data[3]) {
        case WEBSOCKET_HEADER_TYPE_VIDEO:
          header.type = WEBSOCKET_HEADER_TYPE_VIDEO;
          break;
        case WEBSOCKET_HEADER_TYPE_AUDIO:
          header.type = WEBSOCKET_HEADER_TYPE_AUDIO;
          break;
        case WEBSOCKET_HEADER_TYPE_STATUS:
          header.type = WEBSOCKET_HEADER_TYPE_STATUS;
          break;
      }
      if (header.type > 0) {
        header.size = this.intFromBytes(data.subarray(4, 8));
      }
    }
    return header;
  };

  proto.NALU = function (header) {
    /*NALU_TYPE_SLICE    = 1,     byte: 00001   //非IDR图像的编码条带
      NALU_TYPE_DPA      = 2,     byte: 00010   //编码条带数据分割块A
      NALU_TYPE_DPB      = 3,     byte: 00011   //编码条带数据分割块B
      NALU_TYPE_DPC      = 4,     byte: 00100   //编码条带数据分割块C
      NALU_TYPE_IDR      = 5,     byte: 00101   //IDR图像的编码条带
      NALU_TYPE_SEI      = 6,     byte: 00110   //增强信息（SEI）
      NALU_TYPE_SPS      = 7,     byte: 00111   //序列参数集（SPS）
      NALU_TYPE_PPS      = 8,     byte: 01000   //图像参数集（PPS）
      NALU_TYPE_AUD      = 9,     byte: 01001
      NALU_TYPE_EOSEQ    = 10,    byte: 01010
      NALU_TYPE_EOSTREAM = 11,    byte: 01011
      NALU_TYPE_FILL     = 12,    byte: 01100
      #if (MVC_EXTENSION_ENABLE)
      NALU_TYPE_PREFIX   = 14,    byte: 01110
      NALU_TYPE_SUB_SPS  = 15,    byte: 01111
      NALU_TYPE_SLC_EXT  = 20,    byte: 10100
      NALU_TYPE_VDRD     = 24     byte: 11000   */
    var tmp = (parseInt(header, 16)).toString(2);
    //補齊位元數到8
    if (tmp.length < 8) {
      for (var i = 7; i >= tmp.length - 1; i--)
        tmp = "0" + tmp;
    }
    var nalu = {
      ForbiddenZero: 0,
      RefIdc: 0,
      UnitType: 0
    };
    var base = [];
    //轉換為整數
    for (var i in tmp) {
      base[i] = parseInt(tmp[i]);
    }
    nalu.ForbiddenZero = base[0];
    var idc = (base[1] * 2 + base[2]);
    nalu.RefIdc = idc;
    var idx = 3;
    for (var i = 4; i >= 0; i--) {
      nalu.UnitType += base[idx] << i;
      idx++;
    }
    return nalu;
  };

  proto.intFromBytes = function (x) {
    var val = 0;
    for (var i = 0; i < x.length; ++i) {
      val += x[i];
      if (i < x.length - 1) {
        val = val << 8;
      }
    }
    return val;
  };
  proto.onRenderingBefore = function (dt) {
    /*var cache = this._packageCache;
      var nowTime = new Date();
      var ms = nowTime.getTime();
      if(!this._lastTickMs){
        this._lastTickMs = ms;
        return;
      }
      var diffTime = ms - self._lastTickMs;
      var selPkg = cache.getDecodeH264Buffer(diffTime);
      if (selPkg) {
        this._decoder.decode(selPkg.buffer);
        // if (!cc.sys.isMobile) {
          var audioPkg = cache.getDecodeAACBuffer();
          if (audioPkg)
            this.audioPlayer.asset.source.add(audioPkg.buffer);
        // }
  
      }*/
  };

  proto.decodeFromQueueTimer = function () {
    var cache = this._packageCache;
    var nowTime = new Date();
    var ms = nowTime.getTime();
    if (!this._lastTickMs) {
      this._lastTickMs = ms;
      return;
    }
    var diffTime = ms - this._lastTickMs;
    this._lastTickMs = ms;
    var selPkg = cache.getDecodeH264Buffer(diffTime);
    if (selPkg) {
      this._decoder.decode(selPkg.buffer);
      var audioPkg = cache.getDecodeAACBuffer();
      if (audioPkg)
        this.audioPlayer.asset.source.add(audioPkg.buffer);
    }
  };

  proto._setupWorker = function () {
    var self = this;
    var onPictureDecoded = function (buffer, format, width, height, infos) {
      if (self.onPictureDecoded)
        self.onPictureDecoded(buffer, format, width, height, infos);
    };

    if (this._useWorker) {
      var worker = this.worker = new Worker(decodeWorkerUrl);
      worker.addEventListener("message", function (e) {
        cc.log(e)
        var data = e.data;
        if (data.consoleLog) {
          cc.log(data.consoleLog);
          return;
        }

        onPictureDecoded.call(self, new Uint8Array(data.buf, 0, data.length), 0, data.width,
          data.height, data.infos);
      }, false);

      worker.postMessage({
        "type": "Broadway.js - Worker init",
        "options": {
          "rgb": !self._useGL,
          "reuseMemory": self.reuseMemory //
        }
      });

      if (this.transferMemory) {
        this.decode = function (videoData, parInfo) {
          // no copy
          // instead we are transfering the ownership of the buffer
          // dangerous!!!
          worker.postMessage({
            buf: videoData.buffer,
            offset: videoData.byteOffset,
            length: videoData.length,
            info: parInfo
          }, [videoData.buffer]); // Send data to our worker.
        };
      } else {
        this._decodeVideo = function (ts, videoData, parInfo) {
          // Copy the sample so that we only do a structured clone of the region of interest
          var copyU8 = new Uint8Array(videoData.length);
          copyU8.set(videoData, 0, videoData.length);
          worker.postMessage({
            buf: copyU8.buffer,
            offset: 0,
            length: videoData.length,
            info: parInfo
          }, [copyU8.buffer]); //向Worker发送数据
        }
      }

      if (this.reuseMemory) {
        this.recycleMemory = function (parArray) {
          worker.postMessage({
            reuse: parArray.buffer
          }, [parArray.buffer]);
        }
      }
    } else {
      this._packageCache = new baccarat.H264Cache();
      //todo closure compiler
      this._decoder.onPictureDecoded = onPictureDecoded;
      this._decodeVideo = function (ts, videoData, parInfo) {
        //使用主循环来处理，使用队列缓存
        //this._decoder.decode(videoData);
        if (ts === 0)
          this._decoder.decode(videoData);
        else
          this._packageCache.pushH264(ts, videoData);
      };
    }
  };
  /**
  
     * Set the url to handler, if url don't equal currentUrl, it will close the currentUrl connection,
     * and create a new connection.
     * @param {string} url
     */
  proto.setUrl = function (url) {
    if (url !== this._currentUrl) {
      this._client.close();
    }
    this._currentUrl = url;
    if (this._currentUrl) {
      this.reOpen();
    }
  };

  /**
   * Gets the current url string
   * @returns {string}
   */
  proto.getUrl = function () {
    return this._currentUrl;
  };

  /**
   * Close the WebSocket connection.
   */
  proto.close = function () {
    this._currentUrl = null;
    this._client.close();
    // if (this._client.readyState !== WebSocket.CLOSED || this._client.readyState !==
    // WebSocket.CLOSING)
    //this.audioPlayer.stop();
    this._packageCache.clear();
    state = true;
  };

  /**
   * Reopen the WebSocket connection with current url string.
   */
  proto.reOpen = function () {
    if (!this._currentUrl) {
      return
    }
    this._client = new WebSocket(this._currentUrl);
    this._client.onopen = onOpenCallback.bind(this);
    this._client.onerror = onErrorCallback.bind(this);
    this.audioPlayer = AV.Player.fromBufferSource();
    //this.audioPlayer.play();
  };

  proto.getState = function () {
    if (!this._client)
      return -1;
    return this._client.readyState;
  };

  proto.getNetworkStatus = function () {
    return this._statistics.getNetworkStatus();
  };

  //-------------------video caches -----------------

  baccarat.H264Package = function (timestamp, buffer) {
    this.timestamp = timestamp;
    this.buffer = buffer;
    this.bufferSize = buffer.byteLength;
    this.keyframe = (new Uint16Array(buffer.buffer, 16, 1)[0] === 34917)
  };

  function comparePackages(a, b) {
    return a.timestamp - b.timestamp;
  }

  baccarat.H264Cache = function () {
    this._videoCache = [];
    this._audioCache = [];
    this.receivedKeyframe = false;
    this._deltaTime = 0;
  };

  var h264CacheProto = baccarat.H264Cache.prototype;

  h264CacheProto.clear = function () {
    this._videoCache.length = 0;
    this._audioCache.length = 0;
    this.receivedKeyframe = false;
    this.lastPlayedTimestamp = 0;
    this._deltaTime = 0;
  };

  h264CacheProto.sortCaches = function () {
    this._videoCache.sort(comparePackages);
    this._audioCache.sort(comparePackages);
  };
  var VIDEO_FPS = 1000 / 30;
  var CACHE_FRAMES = 5;
  var SKIP_KEYFRAMES = 120; //120幀 才需要跳幀
  h264CacheProto.getDecodeH264Buffer = function (dt) {
    this._deltaTime += dt;
    if (this._deltaTime < this._currentFPS)
      return null;
    this._deltaTime %= this._currentFPS;
    var videoCache = this._videoCache;
    if (videoCache.length < CACHE_FRAMES) //cache frames.
      return null;
    if (videoCache.length == CACHE_FRAMES && state) {
      state = false;
    }
    videoCache.sort(comparePackages);
    var frame = this._searchVideoKeyframe();
    if (!frame) {
      frame = videoCache.shift()
    }

    var range = 0;
    if (frame.timestamp < this.lastPlayedTimestamp) {
      return null;
    }
    if (videoCache.length < 5) {
      range = 0;
    } else if (videoCache.length < 10) {
      range = VIDEO_FPS * 0.1;
    } else if (videoCache.length < 15) {
      range = VIDEO_FPS * 0.25;
    } else if (videoCache.length < 20) {
      range = VIDEO_FPS * 0.3;
    } else if (videoCache.length < 30) {
      range = VIDEO_FPS * 0.4;
    } else if (videoCache.length < 60) {
      range = VIDEO_FPS * 0.5;
    } else if (videoCache.length < 100) {
      range = VIDEO_FPS * 0.6;
    } else {
      range = VIDEO_FPS * 0.7;
    }
    this._currentFPS = VIDEO_FPS - range;
    this.lastPlayedTimestamp = frame.timestamp;
    return frame;
  };

  //如果延遲了 就跳楨到關鍵keyFrame  如果該keyFrame 在 skip內 則先演到該keyFrame 再跳到下一個keyFrame
  h264CacheProto._searchVideoKeyframe = function () {
    var videoCache = this._videoCache;
    if (videoCache.length < SKIP_KEYFRAMES)
      return null;

    var selIdx = -1;
    for (var i = 0; i < videoCache.length; i++) {
      if (videoCache[i].keyframe)
        selIdx = i;
    }
    if (selIdx !== -1) {
      if (selIdx > SKIP_KEYFRAMES) {
        var selPkg = videoCache[selIdx];
        videoCache.splice(0, selIdx + 1);
        return selPkg;
      }
    }
    return null;
  };

  // 推進來時, 如果在list中找到時 就不做事,
  // 如收過keyFrame 則當ts > lastTs pushPackage
  //                  ts < lastTs (收到過時的產物) 則 reset TimeStamp
  // 如無this.receivedKeyframe 就創建package 如有keyFrame 則更改flag 跟lastPlayerTs
  h264CacheProto.pushH264 = function (timestamp, buffer) {
    if (!this.getPackageByTimestamp(this._videoCache, timestamp)) {
      if (this.receivedKeyframe) {
        if (timestamp > this.lastPlayedTimestamp)
          this._videoCache.push(new baccarat.H264Package(timestamp, buffer));
        else {
          if (this.lastPlayedTimestamp - timestamp > 2000)
            this.lastPlayedTimestamp = 0; //reset, because timestamp has been reset.
          // cc.log("lose " + timestamp, this.lastPlayedTimestamp);
        }
      } else {
        var selPkg = new baccarat.H264Package(timestamp, buffer);
        if (selPkg.keyframe) {
          this.receivedKeyframe = true;
          this.lastPlayedTimestamp = timestamp;
          this._videoCache.push(selPkg);
        }
      }
    }
  };

  h264CacheProto.getPackageByTimestamp = function (packages, timestamp) {
    if (!packages || packages.length === 0)
      return null;
    for (var i = 0; i < packages.length; i++) {
      if (packages[i].timestamp === timestamp) {
        return packages[i];
      }
    }
    return null;
  };

  // 從audioCacge中loop 直到找到timeStamp > lastTs return frame
  h264CacheProto.getDecodeAACBuffer = function () {
    var audioCache = this._audioCache;
    var lastPlayedTimestamp = this.lastPlayedTimestamp;
    if (audioCache.length === 0)
      return null;
    while (audioCache.length !== 0) {
      var frame = audioCache[0];
      if (frame == null) {
        return null;
      }
      //時間到了則播放
      if (frame.timestamp - lastPlayedTimestamp >= 0 && frame.timestamp - lastPlayedTimestamp <= VIDEO_FPS) {
        return audioCache.shift();
        //舊的音頻直接丟棄, 避免音頻不同步
      } else if (frame.timestamp < lastPlayedTimestamp) {
        audioCache.shift();
      }
      return null;
    }
    //audioCache.sort(comparePackages);
    /*while (audioCache.length !== 0) {
      var frame = audioCache.shift();
      if (frame.timestamp > this.lastPlayedTimestamp)
        return frame;
    }*/
    return null;
  };

  h264CacheProto.skipAACBuffer = function (timestamp) {
    var audioCache = this._audioCache;
    if (audioCache.length === 0)
      return;
    audioCache.sort(comparePackages);
    var idx = -1;
    for (var i = 0; i < audioCache.length; i++) {
      if (audioCache[i].timestamp > timestamp) {
        idx = i;
        break;
      }
    }
    if (idx > 0)
      audioCache.splice(0, idx)
  };

  h264CacheProto.pushAAC = function (timestamp, buffer) {
    if (!this.getPackageByTimestamp(this._audioCache, timestamp)) {
      var pkg = new baccarat.H264Package(timestamp, buffer);
      this._audioCache.push(pkg);
    }
  };
}
)(lottery.video);