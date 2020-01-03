import { radioBtn } from "./commonBtn";
import { lottery_EventDefine } from "../../Data/lottery_EventDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class lotteryKeyboard extends cc.Component {
    @property(cc.Node)
    content = null;

    keyBoardArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -1];

    //keyBoardjs
    itemArr = [];

    onLoad() {
        for (let index in this.keyBoardArr) {
            let one = this.content.children[index];
            this.itemArr.push(new radioBtn(one, this.numKeyDown.bind(this, index)));
        }
    }

    //按下按钮的回调
    numKeyDown(index) {
        cc.systemEvent.emit(lottery_EventDefine.loginView.keyboradNum, this.keyBoardArr[index])
    }

}