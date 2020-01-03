import videoShader1 from "./videoShader1";
const { ccclass, property } = cc._decorator;
@ccclass
export default class lottery_videoCom extends cc.Component {
    //目标链接
    @property(cc.String)
    currentUrl = 'ws://ws4.jiasula.info:8081/lobbyB/B15/19148936/6eca0113e34c41c1f45a5f9eaf13429c'
    @property(cc.Sprite)
    targetSprite = null;
    @property(cc.Boolean)
    isPlay = false; //是否播放,这里不能完全控制
    @property(cc.Node)
    actionNode = null;

    loadOver = false;

    //
    texureImag = null;
    //socket控制
    _socketController = null;
    //输出大小
    outPutWidth = 0;
    outPutHeight = 0;

    onLoad() {
        cc.game.on(cc.game.EVENT_HIDE, this.gameHideClose, this);
        cc.game.on(cc.game.EVENT_SHOW, this.gameShowReOpen, this);
    }

    init(url, isPlay = false) {
        if (cc._renderType == cc.game.RENDER_TYPE_CANVAS) {
            console.log('canvas下无法播放');
            return;
        }
        this.isPlay = isPlay;
        this.currentUrl = url || this.currentUrl;
        this._socketController = new ebet.baccarat.VideoSocketController(this.currentUrl, false, true);
        this.VideoShader = new videoShader1();
        this.VideoShader.ShaderEffect(this.node);
        this.texureImag = new cc.Texture2D();
        !this.targetSprite && (this.targetSprite = this.node.getComponent(cc.Sprite));
        this.targetSprite.spriteFrame = new cc.SpriteFrame(this.texureImag);
        this.outPutHeight = this.node.height;
        this.outPutWidth = this.node.width;
        this._socketController.onPictureDecoded = this.onPictureDecoded.bind(this);
        if (this.actionNode) {
            let callFunc = cc.callFunc(function () {
                this.actionNode.rotation += 30;
                this.actionNode.rotation %= 360;
            }.bind(this));
            let repfor = cc.repeatForever(cc.sequence(cc.delayTime(0.1), callFunc));
            this.actionNode.runAction(repfor)
        }
    }
    //暂停
    pause() {
        this.isPlay = false;
        this.gameHideClose();
    }
    //开始
    continue() {
        this.isPlay = true;
        this.gameShowReOpen();
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
        this.loadOver = true;
        this.VideoShader._currentBuffer = data;
        this.texureImag.initWithData(data, pixelFormat, pixelsWidth, pixelsHeight, contentSize);
    }

    gameHideClose() {
        if (this._socketController) {
            this._socketController.close();
        }
    }

    gameShowReOpen() {
        if (this._socketController && this.isPlay) {
            this._socketController._currentUrl = this.currentUrl;
            this._socketController.reOpen();
        }
    }

    update(dt) {
        if (!this.isPlay) return;
        if (this._socketController && this._socketController.onRenderingBefore) {
            this._socketController.onRenderingBefore(dt);
            this.VideoShader.Myrendering(ebet.videoSize);
        }
    }

    onDestroy() {
        cc.game.off(cc.game.EVENT_HIDE, this.gameHideClose);
        cc.game.off(cc.game.EVENT_SHOW, this.gameShowReOpen);
        this._socketController.close();
        this._socketController = null;
        this.unscheduleAllCallbacks();
    }
}
