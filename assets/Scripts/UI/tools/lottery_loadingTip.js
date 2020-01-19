import GlobalMsg from "../../Core/Event/lottery_GlobalMsg";
import { lottery_EventDefine } from "../../Data/lottery_EventDefine";

const { ccclass, property } = cc._decorator;
@ccclass
export default class lottery_loadingTip extends cc.Component {
    @property(cc.Integer)//播放最长时间
    playLongTime = 2500;
    @property(cc.Node)
    actionNode = null;
    //定时器ID
    timeId = null;
    onEnable() {
        this.startAction();
    }
    onDisable() {
        this.actionNode.stopAllActions();
    }
    //开始播放
    startPlay() {
        this.node.active = true;
        this.timeId = setTimeout(() => {
            this.node.active = false;
            GlobalMsg.getInstance().Send(lottery_EventDefine.sys.loadingOvertime);
        }, this.playLongTime);
    }
    //停止播放
    stopPlay() {
        this.node.active = false;
        clearTimeout(this.timeId);
        this.timeId = null;
    }
    startAction() {
        let callFunc = cc.callFunc(function () {
            this.actionNode.rotation += 30;
            this.actionNode.rotation %= 360;
        }.bind(this));
        let repfor = cc.repeatForever(cc.sequence(cc.delayTime(0.1), callFunc));
        this.actionNode.runAction(repfor)
    }
}