import commonBtn, { groupBtn } from "../tools/commonBtn";
import lottery_MsgStation from "../../Data/lottery_MsgStation";
import Utils from "../../Core/Tools/lottery_Utils";
import Helper from "../tools/lottery_helper";
const { ccclass, property } = cc._decorator;
var lottertList =
{
    CP1001: {
        title: "EBet 时时彩",
        spriteName: "lottery_pc28",
        lotteryCode: 'CP1001',
    },
    CP1002: {
        title: "EBET 3D",
        spriteName: "lottery_3d",
        lotteryCode: 'CP1002',
    },
    CP1003: {
        title: "EBet 快3",
        spriteName: "lottery_k3",
        lotteryCode: 'CP1003',
    },
    CP1004: {
        title: "EBet PK10",
        spriteName: "lottery_pk10",
        lotteryCode: 'CP1004',
    },
    CP1005: {
        title: "EBET 11选5",
        spriteName: "lottery_11x5",
        lotteryCode: 'CP1005',
    }
};

@ccclass
export default class lotterySelect extends cc.Component {

    @property(cc.Node)
    selectItem = null;
    @property(cc.Node)
    itemPrefab = null;
    @property(cc.Node)
    closeBtn = null;
    @property(cc.Node)
    submitBtn = null;
    //彩种数据
    lotteryTypeData;
    //类数组
    btnGroup = {
        arr: [],
        index: null
    }

    onLoad() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.closeBtnDown, this);
        this.submitBtn.on(cc.Node.EventType.TOUCH_END, this.submitBtnDown, this);
    }
    hide() {
        this.node.active = false;;
    }
    show(listData) {
        this.node.active = true;
        this.lotteryData = [];
        for (let one of listData) {
            lottertList[one] && this.lotteryData.push(lottertList[one]);
        }
        let dataIndex = 0;
        this.btnGroup.index = null;
        this.btnGroup.arr.forEach(element => {
            let data = this.lotteryData[dataIndex++];
            if (data)
                element.updateData(data);
            else
                element.destroy();
        });
        let data = this.lotteryData[dataIndex];
        while (data) {
            let one = cc.instantiate(this.itemPrefab);
            one.active = true;
            this.btnGroup.arr.push(new selectBtn(data, one, () => { }, this.btnGroup));
            this.selectItem.addChild(one);
            data = this.lotteryData[++dataIndex];
        }
    }
    submitBtnDown() {
        if (this.btnGroup.index == null) {
            Helper.getInstance().showTips("请选择彩种");
        } else {
            lottery_MsgStation.getInstance().onSendLotteryChoice(this.lotteryData[this.btnGroup.index].lotteryCode);
        }
    }
    closeBtnDown() {
        this.node.active = false;
    }
}

class selectBtn extends groupBtn {
    nameLable0;
    nameLable1;
    icon;
    constructor(data, node, callback, group) {
        super(node, callback, group);
        this.nameLable0 = cc.find('name', this.defaultNode).getComponent(cc.Label);
        this.nameLable1 = cc.find('name', this.selectNode).getComponent(cc.Label);
        this.icon = cc.find('icon', this.node).getComponent(cc.Sprite);
        this.updateData(data);
    }
    updateData(data) {
        this.select(false);
        this.nameLable0.string = data.title;
        this.nameLable1.string = data.title;
        Utils.getInstance().setSprite(this.icon, data.spriteName, 'texture1');
    }
    clean() {
        this.node.destroy();
    }
}

