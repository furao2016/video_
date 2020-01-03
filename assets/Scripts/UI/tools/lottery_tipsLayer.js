const { ccclass, property } = cc._decorator;

@ccclass
export default class lottery_tipsLayer extends cc.Component {
    @property(cc.Label)
    strLable = null;

    showTips(content) {
        this.node.active = true;
        this.node.opacity = 255;
        this.node.stopAllActions();
        this.strLable.string = content;
        this.tipsToDisappear();
    }

    //自动隐藏
    tipsToDisappear() {
        let fade = cc.fadeOut(0.5);
        let fadeFunc = cc.callFunc(function () {
            this.node.active = false;
        }, this);

        this.action = cc.sequence(cc.delayTime(1), fade, fadeFunc);
        this.node.runAction(this.action);
    }
}