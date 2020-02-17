import { radioBtn } from './commonBtn'
const { ccclass, property } = cc._decorator;
@ccclass
export default class lottery_tipsLayer extends cc.Component {
    @property(cc.Label)
    strLable = null;
    @property([cc.Node])
    tipNode = [];

    start() {
        new radioBtn(cc.find('box/btn', this.tipNode[1]), () => {
            window.location.reload();
        });
    }
    showTips(content, type = 1) {
        this.node.active = true;
        this.node.opacity = 255;
        if (type == 2) {
            this.tipNode[1].active = true;
            this.tipNode[0].active = false;
        } else {
            this.tipNode[1].active = false;
            this.tipNode[0].active = true;
            this.tipNode[0].stopAllActions();
            this.strLable.string = content;
            this.tipsToDisappear();
        }

    }

    //自动隐藏
    tipsToDisappear() {
        let fade = cc.fadeOut(0.5);
        let fadeFunc = cc.callFunc(function () {
            this.node.active = false;
        }, this);

        this.action = cc.sequence(cc.delayTime(0.7), fade, fadeFunc);
        this.node.runAction(this.action);
    }
}