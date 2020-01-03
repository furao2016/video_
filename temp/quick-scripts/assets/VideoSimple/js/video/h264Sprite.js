(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/VideoSimple/js/video/h264Sprite.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '666d3xWPENCb7R9e1WAvOT7', 'h264Sprite', __filename);
// VideoSimple/js/video/h264Sprite.js

'use strict';

/**************************************************************************
 * Copyright (C) 2015 ebet.com, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by ebet.com
 **************************************************************************/
module.exports = H264SpriteFn;

function H264SpriteFn(baccarat) {
    baccarat.H264Sprite = cc.Class({
        extends: cc.Component,
        name: 'videoSpriteCom',
        properties: {
            _currentUrl: null,
            _socketController: null,

            _hideListener: null,
            _showListener: null,

            _lbTipInfo: null,
            _count: 0,
            _useWebWorker: true
        },
        ctor: function ctor() {
            this._currentUrl = ebet.baccarat._currenturl;
            cc.game.on(cc.game.EVENT_HIDE, this.gameHideClose, this);
        },
        gameHideClose: function gameHideClose() {
            if (this._socketController) {
                this._socketController.close();
            }
        },
        gameShowReOpen: function gameShowReOpen() {
            if (this._socketController) {
                this._socketController.reOpen();
            }
        },

        // schefunction:function()
        // {
        //     cc.log("schefunction");
        // },
        //----------------------------------------------------------------------------------------------------------
        update: function update(dt) {
            // cc.log("update");
            // this._count+= dt;
            // if(this._count > 0.02)
            // {
            //     this._count = 0;
            if (this._socketController.onRenderingBefore) {
                this._socketController.onRenderingBefore(dt);
                this.VideoShader.Myrendering(ebet.videoSize);
            }
            // }
        },
        onDestroy: function onDestroy() {
            cc.game.off(cc.game.EVENT_HIDE, this.gameHideClose);
            this._socketController.close();
            this._socketController = null;
            this.unscheduleAllCallbacks();
        },
        onLoad: function onLoad() {
            var _this = this;

            this.VideoShader = require('VideoShader');
            this.VideoShader.node = this.node;
            this.scheduleOnce(function () {
                _this.node.removeCom = false;
            }, 0.05);
            var renderer = void 0,
                useWorker = false,
                self = this; //baccarat.USE_WORKER;
            if (cc._renderType !== cc.game.RENDER_TYPE_CANVAS) {
                this._socketController = new baccarat.VideoSocketController(this._currentUrl, useWorker, true);
            }
            var shaderStatus = false;
            var texureImag = new cc.Texture2D();
            var selfSprite = self.node.getComponent(cc.Sprite);
            this._socketController.onPictureDecoded = function (data, pixelFormat, pixelsWidth, pixelsHeight, contentSize) {
                if (self.node.removeCom) return;
                if (!shaderStatus) {
                    shaderStatus = true;
                    self.VideoShader.ShaderEffect();
                }

                self.VideoShader._currentBuffer = data;
                texureImag.initWithData(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize);
                selfSprite.spriteFrame = new cc.SpriteFrame(texureImag);
                selfSprite.node.width = cc.winSize.width;
                selfSprite.node.height = cc.winSize.height;
            };
        }
    });
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
        //# sourceMappingURL=h264Sprite.js.map
        