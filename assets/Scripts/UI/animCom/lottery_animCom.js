import lottery_animDataMgr from "../../Data/lottery_animDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class lottery_animCom extends cc.Component {
    @property(cc.Integer)
    frameRate = 25; //帧率
    @property(cc.Boolean)
    isLoop = false; //是否循环
    @property(cc.Boolean)
    isPlaying = false;//是否正在播放
    @property(cc.Sprite)
    targetSprite = null;//目标精灵
    @property({ type: cc.String, tooltip: "获取animMgr中指定的序列帧数组" })
    folderName = String;//??这样写编辑器不会提示有问题
    //图集
    frameSpriteArr = [];
    //当前时间
    nowTime = 0;
    //开始时间
    startTime = 0;
    //帧间隔时间
    frameTime = 0;
    //播放完后的回调
    playFinishCallBack = null;
    //setData的时候加载失败
    loadFail = false;

    onLoad() {
        this.frameTime = 1 / this.frameRate;
        this.folderName && (this.frameSpriteArr = lottery_animDataMgr.getInstance().resDir[this.folderName]);
        !this.frameSpriteArr && (this.frameSpriteArr = []);
        !this.targetSprite && (this.targetSprite = this.node.getComponent(cc.Sprite));
    }
    //
    update(dt) {
        if (this.loadFail) {
            this.frameSpriteArr = lottery_animDataMgr.getInstance().resDir[this.folderName];
            if (!this.frameSpriteArr || !this.frameSpriteArr.length) return;
            this.targetSprite.spriteFrame = this.frameSpriteArr[Math.floor(this.startTime / this.frameTime)];
            this.nowTime = this.startTime;
            this.isPlaying = true;
            this.loadFail = false;
            return;
        }
        if (!this.isPlaying) return;
        this.nowTime += dt;
        let index = Math.floor(this.nowTime / this.frameTime);
        if (index >= this.frameSpriteArr.length) { //大于总帧数
            if (this.isLoop) {
                index = 0;
                this.nowTime = this.startTime;
            } else {
                this.isPlaying = false;
                this.nowTime = this.startTime;
                index = this.frameSpriteArr.length - 1;
                this.playFinishCallBack && this.playFinishCallBack(this.folderName);
            }
        }
        this.targetSprite.spriteFrame = this.frameSpriteArr[index];
    }
    /**
     * 现在就停止播放
     */
    quickClosePlay() {
        this.isPlaying = false;
        this.playFinishCallBack && this.playFinishCallBack();
    }

    /**
     * 设置播放
     * @param folderName 指定帧数组
     * @param startTime 开始时间
     */
    setData(folderName, startTime = 0, isLoop = false) {
        if (folderName == '') return;
        this.folderName = folderName;
        this.isLoop = isLoop;
        this.startTime = startTime;
        this.nowTime = this.startTime;
        let data = lottery_animDataMgr.getInstance().resDir[folderName];
        if (!data || data.length == 0) { this.loadFail = true; return; }
        this.isPlaying = true;
        this.frameSpriteArr = data;
        this.targetSprite.spriteFrame = this.frameSpriteArr[Math.floor(this.nowTime / this.frameTime)];
    }
    //设置播放完成回调
    setFinshCallBack(callBack) {
        this.playFinishCallBack = callBack;
    }

    /**
     * 设置是否循环
     */
    setLoop(is) {
        this.isLoop = is;
    }
}