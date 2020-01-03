"use strict";
cc._RF.push(module, 'd79bbq21oJHw53tzVJ9q1aL', 'videoSprite');
// VideoSimple/js/videoSprite.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        videoSprite: cc.Node
    },
    initVideo: function initVideo() {},
    onLoad: function onLoad() {
        if (cc.sys.isBrowser && !ebet.baccarat.H264Sprite) {
            require('AAC')(window); //初始化web端的直播视频
            require('videoSocketController')(ebet.baccarat); //初始化web端的直播视频
            require('H264Sprite')(ebet.baccarat); //初始化web端的直播视频
        }
        var videoUrl = 'ws://ws4.jiasula.info:8081/lobbyB/B15/19148936/6eca0113e34c41c1f45a5f9eaf13429c';
        this.playVideo(this.videoSprite, videoUrl);
    },
    playVideo: function playVideo(videoSprite, url) {
        ebet.baccarat._currenturl = url;
        videoSprite.addComponent(ebet.baccarat.H264Sprite);
    },
    onDestroy: function onDestroy() {}
});

cc._RF.pop();