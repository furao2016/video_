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
            _useWebWorker: true,
        },
        ctor: function () {
            this._currentUrl = ebet.baccarat._currenturl;
            cc.game.on(cc.game.EVENT_HIDE, this.gameHideClose, this);
        },
        gameHideClose() {
            if (this._socketController) {
                this._socketController.close();
            }
        },
        gameShowReOpen() {
            if (this._socketController) {
                this._socketController.reOpen();
            }
        },
        // schefunction:function()
        // {
        //     cc.log("schefunction");
        // },
        //----------------------------------------------------------------------------------------------------------
        update: function (dt) {
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
        onDestroy: function () {
            cc.game.off(cc.game.EVENT_HIDE, this.gameHideClose);
            this._socketController.close();
            this._socketController = null;
            this.unscheduleAllCallbacks();
        },
        onLoad: function () {
            this.VideoShader = require('VideoShader');
            this.VideoShader.node = this.node;
            this.scheduleOnce(() => {
                this.node.removeCom = false;
            }, 0.05)
            let renderer, useWorker = false,
                self = this; //baccarat.USE_WORKER;
            if (cc._renderType !== cc.game.RENDER_TYPE_CANVAS) {
                this._socketController = new baccarat.VideoSocketController(this._currentUrl, useWorker, true);
            }
            let shaderStatus = false;
            let texureImag = new cc.Texture2D();
            let selfSprite = self.node.getComponent(cc.Sprite);
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
            }
        },
    })
};