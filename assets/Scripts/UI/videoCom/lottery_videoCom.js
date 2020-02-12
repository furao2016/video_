import videoShader1 from "./videoShader1";
cc.Class({
    extends: cc.Component,
    properties: {
        //目标链接
        currentUrl: cc.String,
        targetSprite: cc.Sprite //目标sprite
    },

    ctor() {
        /*目标纹理2D*/
        this.texureImag = null;
        /**目标spriteFrame*/
        this.targetSpriteFrame = null;
        /**socket控制*/
        this._socketController = null;
        /**是否加载完成*/
        this.loadOver = false;
        this.renderSize = null;
    },

    onLoad() {
        cc.game.on(cc.game.EVENT_HIDE, this.gameHideClose, this);
        cc.game.on(cc.game.EVENT_SHOW, this.gameShowReOpen, this);
    },


    onEnable() {
        this.gameShowReOpen();
    },

    onDisable() {
        this.gameHideClose();
    },

    init() {
        if (this.currentUrl == '' || !this.currentUrl) return;
        if (cc._renderType == cc.game.RENDER_TYPE_CANVAS) {
            console.log('canvas下无法播放');
            return;
        }
        //获取播放sprite
        !this.targetSprite && (this.targetSprite = this.node.getComponent(cc.Sprite));
        !this.targetSprite && (this.targetSprite = this.node.addComponent(cc.Sprite));
        //创建纹理
        this.VideoShader = new videoShader1();
        this.VideoShader.ShaderEffect(this.node);
        this.texureImag = new cc.Texture2D();
        //绑定sprite
        this.targetSpriteFrame = new cc.SpriteFrame(this.texureImag);
        this.targetSprite.spriteFrame = this.targetSpriteFrame;
        //
        this._socketController = new lottery.video.VideoSocketController(this.currentUrl, false, true);
        this._socketController.onPictureDecoded = this.onPictureDecoded.bind(this);
        this._socketController._packageCache.clear();
    },
    //设置url
    setUrl(url) {
        this.targetSprite.spriteFrame = null;
        this.currentUrl = url;
        if (this._socketController) {
            if (this.node.active) {
                let one = this._socketController._client;
                one.close();
                this._socketController.setUrl(this.currentUrl);
            }
        } else {
            this.init();
        }
    },
    //播放投射到其他地方
    changeTargetSprite(target) {
        target.spriteFrame = new cc.SpriteFrame(this.texureImag);
        this.VideoShader.ShaderEffect(target.node);
        target.node.height = 1080;
        target.node.width = 1980
    },

    //图片编码
    onPictureDecoded(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize) {
        this.VideoShader._currentBuffer = data;
        this.texureImag.initWithData(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize);
        if (!this.renderSize) this.renderSize = { height: pixelsHeight, width: pixelsWidth };
        if (!this.targetSprite.spriteFrame) {
            this.targetSpriteFrame.setOriginalSize(this.renderSize);
            this.targetSpriteFrame.setRect(cc.rect(0, 0, this.renderSize.width, this.renderSize.height));
            this.targetSprite.spriteFrame = this.targetSpriteFrame;
        }
    },

    gameHideClose() {
        if (this._socketController) {
            this._socketController.close();
        }
    },

    gameShowReOpen() {
        if (this._socketController) {
            this.targetSprite.spriteFrame = null;
            this._socketController._currentUrl = this.currentUrl;
            this._socketController.reOpen();
        } else {
            this.init();
        }
    },

    update(dt) {
        if (this._socketController && this._socketController.onRenderingBefore && this.renderSize) {
            this._socketController.onRenderingBefore(dt);
            this.VideoShader.Myrendering(this.renderSize);
        }
    },

    onDestroy() {
        if (this._socketController) {
            this._socketController.close();
            this._socketController = null;
        }
        cc.game.off(cc.game.EVENT_HIDE, this.gameHideClose);
        cc.game.off(cc.game.EVENT_SHOW, this.gameShowReOpen);
    }
})