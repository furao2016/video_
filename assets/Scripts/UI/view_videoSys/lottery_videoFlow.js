import videosMsgFatory from "./videoMsgFactory";
import Utils from "../../Core/Tools/lottery_Utils";
import lottery_animCom from "../animCom/lottery_animCom";
import lottery_lotteryData from "../../Data/lottery_lotteryData";
import { setInterval, clearInterval } from "timers";
import lottery_videoCom from "../videoCom/lottery_videoCom";
import { lottery_EventDefine } from "../../Data/lottery_EventDefine";
import lottery_MsgStation from "../../Data/lottery_MsgStation";
const { ccclass, property } = cc._decorator;
//考虑再拆分成小类,当前写法下每一个阶段一个函数，每个函数中有大量的修改界面的代码
//只有按照正确的顺序执行 才能正常的显示
@ccclass
export default class lottery_videoFlow extends cc.Component {
    //定义的收到消息后的方法
    msgFuncDefine = ['firstStage', 'secondStage', 'thirdStage', 'fourStage', 'fiveStage', 'sixStage', 'waitStage', 'fengPan'];
    @property([cc.VideoPlayer])
    videoArr = []; //视频合集
    @property([cc.Node])
    qiShuArr = [];
    @property(cc.Node)
    nodeItem = null;
    @property(lottery_animCom)
    littleCom = null;
    @property(cc.Animation)
    startLottery = null;
    @property([cc.Animation])
    balls = [];
    @property(lottery_videoCom)
    videoStream = null;
    @property([cc.Sprite])
    countDownArr = [];

    //播放队列
    msgList = [];
    //播放总时长秒
    totalTime = 60;
    //当前顺序
    nowMsgPos = 0;
    //是否播放倒计时
    isPlayCountDown = false;
    /**上一阶段的结束后执行的操作*/
    stageFinsh;

    onLoad() {
        this.videoStream.setUrl(lottery_lotteryData.getInstance().videoUrl.vice.HD);
    }

    start() {
        for (let one of this.videoArr) {
            one.node.on('completed', this.animFinshCallBack.bind(this));
            one.node.active = false;
        }
        for (let one of this.balls)
            one.node.active = false;
        let arr = document.getElementsByClassName('cocosVideo');
        for (let one of arr) {
            one.muted = true;
            one.style.zIndex = '-1';
        }
        this.videoStream.node.opacity = 0;
        cc.systemEvent.on(lottery_EventDefine.VIDEOFLOW.RESTART, this.startPlay, this);
    }

    /**
     * 开始播放
     */
    startPlay() {
        this.msgList = videosMsgFatory.ins().msgList;
        this.animFinshCallBack();
    }

    /**
     * 结束播放
     */
    stopPlay() {
        this.videoStream.gameHideClose();
    }
    /*--------------------------------------------播放阶段设置--------------------------------------------- */
    //每一阶段结束回调,这里的判断条件是单段视频播放完毕，然而存在循环播放的情况，这种写法则会重复调用
    animFinshCallBack() {
        if (this.isPlayCountDown) {
            this.videoArr[5].play();
            return;
        }
        console.log("某一阶段播放完毕");
        this.unscheduleAllCallbacks();
        this.stageFinsh && this.stageFinsh();
        let obj = this.msgList.shift();
        if (obj) { //播放当前
            this[this.msgFuncDefine[obj.type - 1]](obj.data);
        } else {
            console.log('消息队列空了');
            //重新开始
            this.startPlay();
        }
    }
    //片头
    firstStage(time) {
        //设置期数
        let expect = lottery_lotteryData.getInstance().expect;
        let nestExpect = lottery_lotteryData.getInstance().nestExpect;
        this.setQiShu(expect, this.qiShuArr[0], true);
        this.setQiShu(expect, this.qiShuArr[1], false)
        this.setQiShu(nestExpect, this.qiShuArr[2], true);
        //
        this.videoArr[0].node.active = true;
        this.videoArr[0].play();

        this.qiShuArr[0].active = true;
        let anim = this.qiShuArr[0].getComponent(cc.Animation);
        anim.play();

        let timer;
        if (time) {
            timer = setTimeout(() => {
                this.animFinshCallBack();
            }, time);
        }
        this.stageFinsh = () => {
            anim.stop();
            this.qiShuArr[0].active = false;
            this.videoArr[0].stop();
            this.videoArr[0].node.active = false;
            timer && clearTimeout(timer);
        }

    }
    /**
     * 开奖倒计时
     * @param  index 从第几个开始 
     */
    secondStage(data = 10) {
        this.videoArr[1].node.active = true;
        this.videoArr[1].currentTime = data >= 10 ? -1 : 10 - data;
        this.videoArr[1].play();
        this.stageFinsh = () => {
            this.videoArr[1].stop();
            this.videoArr[1].node.active = false;
        }
    }
    /**
     * 开奖进行时 
     */
    thirdStage() {
        this.videoStream.node.opacity = 255;
        this.littleCom.node.active = true;
        this.littleCom.setData('startLotteryBg');
        cc.systemEvent.on(lottery_EventDefine.VIDEOFLOW.BALLINFO, this.setOneBallFly, this);
        this.littleCom.setFinshCallBack(() => {
            this.littleCom.setData('startLotteryBgLoop', 0, true);
            this.startLottery.node.active = true
            this.startLottery.play();
            if (lottery_lotteryData.getInstance().simulated) {
                let one = 0;
                let timer = setInterval(() => {
                    if (one >= 2) {
                        clearInterval(timer);
                    }
                    lottery_MsgStation.getInstance().lotteryResults({ index: one++, openCode: 1 });
                }, 2000);
            }
        })
        this.stageFinsh = () => {
            this.littleCom.node.active = false;
            this.videoStream.node.opacity = 0;
            cc.systemEvent.off(lottery_EventDefine.VIDEOFLOW.BALLINFO, this.setOneBallFly, this);
        }
    }
    /**
     * 播放开奖结果
     */
    fourStage(data) {
        this.videoArr[2].node.active = true;
        this.videoArr[2].play();
        this.balls[0].play('ball_1');
        this.balls[1].play('ball_2');
        this.balls[2].play('ball_3');
        this.startLottery.play('startLottery_qishu');
        this.stageFinsh = () => {
            this.videoArr[2].stop();
            this.videoArr[2].node.active = false;
        }
    }
    /**
     * 播放 ebet3d logo
     */
    fiveStage(data) {
        this.startLottery.play('startLottery_3');
        this.balls[0].play('ball_stop_1');
        this.balls[1].play('ball_stop_2');
        this.balls[2].play('ball_stop_3');
        this.videoArr[3].node.active = true;
        this.videoArr[3].play();
        this.stageFinsh = () => {
            this.videoArr[3].stop();
            this.videoArr[3].node.active = false;
        }
    }
    /**
     * 下期预告
     * @param  time 播放时间
     */
    sixStage(data) {
        this.videoArr[4].node.active = true;
        this.videoArr[4].play();
        this.qiShuArr[2].active = true;
        let anim = this.qiShuArr[2].getComponent(cc.Animation);
        anim.play();
        this.stageFinsh = () => {
            anim.stop();
            for (let one of this.balls)
                one.node.active = false;
            this.startLottery.node.active = false;
            this.qiShuArr[2].active = false;
            this.videoArr[4].stop();
            this.videoArr[4].node.active = false;
        }
    }
    /**
     * 等待状态,
     * time 等待时间
     */
    waitStage(time) {
        this.isPlayCountDown = true;
        this.videoArr[5].node.active = true;
        this.videoArr[5].play();
        this.countDownArr[0].node.parent.active = true;
        this.setCountDown(time--);
        let timer1 = setInterval(() => {
            if (time < 0) {
                clearInterval(timer1);
                this.isPlayCountDown = false;
                this.animFinshCallBack();
            }
            this.setCountDown(time--);
            this.countDownArr[4].node.active = !this.countDownArr[4].node.active;
        }, 1000);
        this.stageFinsh = () => {
            this.countDownArr[0].node.parent.active = false;
            this.videoArr[5].stop();
            this.videoArr[5].node.active = false;
        }
    }
    /**封盘**/
    fengPan() {
        this.videoArr[6].node.active = true;
        this.videoArr[6].play();
        this.stageFinsh = () => {
            this.videoArr[6].node.active = false;
            this.videoArr[6].stop();
        }
    }
    /*----------------------------------------------相关设置----------------------------------------------*/
    /**
     * 设置当前播放期数
    */
    setQiShu(str, node, isBig = true) {
        node.removeAllChildren();
        let arr = (str + '').split('');
        let func = (url) => {
            let one = cc.instantiate(this.nodeItem);
            Utils.getInstance().setSprite(one.getComponent(cc.Sprite), url, 'LEDAtlas');
            node.addChild(one);
        }

        if (isBig) {
            for (let name of arr) {
                func('wz_sz_' + name);
            }
            func('wz_qi');
        } else {
            for (let name of arr) {
                func('wz_xsz_' + name);
            }
            func('wz_qi_2');
        }
    }
    /**
     * 设置倒计时,最小单位是秒
     */
    setCountDown(time = 60) {
        let minute = Math.floor(time / 60);
        let second = time - minute * 60;
        minute = (minute + '').split('');
        second = (second + '').split('');
        if (minute.length == 1) minute.unshift(0);
        if (second.length == 1) second.unshift(0);
        Utils.getInstance().setSprite(this.countDownArr[0], minute[0], 'countDown');
        Utils.getInstance().setSprite(this.countDownArr[1], minute[1], 'countDown');
        Utils.getInstance().setSprite(this.countDownArr[2], second[0], 'countDown');
        Utils.getInstance().setSprite(this.countDownArr[3], second[1], 'countDown');
    }
    /**设置单个球的飞入*/
    //球的坐标
    setOneBallFly(event) {
        let index = event.detail.index;
        let ballNum = event.detail.openCode;
        Utils.getInstance().setSprite(this.balls[index].getComponent(cc.Sprite), 'cq_' + ballNum, 'LEDAtlas');
        this.balls[index].node.active = true;
        this.balls[index].play();
        if (index == 2) {
            console.log("最后一颗球");
            setTimeout(() => {
                this.animFinshCallBack();
            }, 2000);

        }
    }
}