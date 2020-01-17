import videoShader1 from "./videoShader1";
const { ccclass, property } = cc._decorator;
@ccclass
export default class lottery_videoCom extends cc.Component {
    //目标链接
    @property(cc.String)
    currentUrl = 'ws://ws4.jiasula.info:8081/lobbyB/B15/19148936/6eca0113e34c41c1f45a5f9eaf13429c'
    @property(cc.Sprite)
    targetSprite = null; //目标sprite

    /*目标纹理2D*/
    texureImag = null;
    /**目标spriteFrame*/
    targetSpriteFrame = null;
    /**socket控制*/
    _socketController = null;

    /**isplay*/
    isPlay = false;

    onLoad() {
        cc.game.on(cc.game.EVENT_HIDE, this.gameHideClose, this);
        cc.game.on(cc.game.EVENT_SHOW, this.gameShowReOpen, this);
        this.init();
    }

    onEnable() {
        this.gameShowReOpen();
    }

    onDisable() {
        this.gameHideClose();
    }

    init() {
        if (cc._renderType == cc.game.RENDER_TYPE_CANVAS) {
            console.log('canvas下无法播放');
            return;
        }
        this.isPlay = true;
        //获取播放sprite
        !this.targetSprite && (this.targetSprite = this.node.getComponent(cc.Sprite));
        !this.targetSprite && (this.targetSprite = this.node.addComponent(cc.Sprite));
        //创建纹理
        this.VideoShader = new videoShader1();
        this.VideoShader.ShaderEffect(this.targetSprite.node);
        this.texureImag = new cc.Texture2D();
        //绑定sprite
        this.targetSpriteFrame = new cc.SpriteFrame(this.texureImag);
        this.targetSprite.spriteFrame = this.targetSpriteFrame;
    }

    //设置url
    setUrl(url) {
        this.targetSprite.spriteFrame = null;
        this.currentUrl = url;
        if (this._socketController) {
            if (this.node.active) {
                this._socketController._packageCache.clear();
                this._socketController.setUrl(this.currentUrl);
            }
        } else {
            this._socketController = new lottery.video.VideoSocketController(this.currentUrl, false, true);
            this._socketController.onPictureDecoded = this.onPictureDecoded.bind(this);
        }
    }
    //播放投射到其他地方
    changeTargetSprite(target) {
        target.spriteFrame = new cc.SpriteFrame(this.texureImag);
        this.VideoShader.ShaderEffect(target.node);
        target.node.height = 1080;
        target.node.width = 1980
    }

    //图片编码
    onPictureDecoded(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize) {
        if (!this.isPlay) return;
        if (!this.targetSprite.spriteFrame) this.targetSprite.spriteFrame = this.targetSpriteFrame;
        this.VideoShader._currentBuffer = data;
        this.texureImag.initWithData(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize);
        this.targetSprite.node.width = this.node.parent.width;
        this.targetSprite.node.height = this.node.parent.width * pixelsHeight / pixelsWidth;
    }

    gameHideClose() {
        if (this._socketController) {
            this._socketController.close();
        }
    }

    gameShowReOpen() {
        if (this._socketController) {
            this._socketController._currentUrl = this.currentUrl;
            this._socketController.reOpen();
        }
    }

    update(dt) {
        if (this.isPlay && this._socketController && this._socketController.onRenderingBefore) {
            this._socketController.onRenderingBefore(dt);
            this.VideoShader.Myrendering(ebet.videoSize);
        }
    }

    onDestroy() {
        cc.game.off(cc.game.EVENT_HIDE, this.gameHideClose);
        cc.game.off(cc.game.EVENT_SHOW, this.gameShowReOpen);
        this._socketController.close();
        this._socketController = null;
    }
}
