import { groupBtn } from "../tools/commonBtn";
import { lottery_EventDefine } from "../../Data/lottery_EventDefine";
import lottery_MsgStation from "../../Data/lottery_MsgStation";
import Helper from "../tools/lottery_helper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class lotteryLogin extends cc.Component {
    //BtnArr
    btnGruop = {
        arr: [],
        index: null
    }

    @property(cc.Node)
    content = null;

    @property(cc.Node)
    sumbitBtn = null;

    onLoad() {
        for (let i = 0, length = this.content.children.length; i < length; i++) {
            this.btnGruop.arr.push(new loginCotentBtn(this.content.children[i], () => { }, this.btnGruop));
        }
        this.sumbitBtn.on(cc.Node.EventType.TOUCH_END, this.submitInfor, this);
    }
    onEnable() {
        cc.systemEvent.on(lottery_EventDefine.loginView.keyboradNum, this.setContent, this);
    }
    onDisable() {
        cc.systemEvent.off(lottery_EventDefine.loginView.keyboradNum, this.setContent, this);
    }

    /**
     * 提交按钮
     */
    submitInfor() {
        let user = this.btnGruop.arr[0].editbox.string;
        let password = this.btnGruop.arr[1].editbox.string;
        if (user == '')
            Helper.getInstance().showTips("用户名不能为空");
        else if (password == '')
            Helper.getInstance().showTips("密码不能为空");
        else
            lottery_MsgStation.getInstance().onSendEnterLogin(user, password);
    }

    /**
     * 通过虚拟键盘输入文本框
     * @param {*} event 
     */
    setContent(event) {
        if (this.btnGruop.index == null) return;
        let btn = this.btnGruop.arr[this.btnGruop.index];
        let value = event.getUserData();
        if (value != -1) {
            btn.editbox.string += value;
            btn.delBtnNode.active = true;
        }
        else {
            let str = btn.editbox.string;
            str = str.substr(0, str.length - 1);
            btn.editbox.string = str;
            btn.delBtnNode.active = str.length ? true : false
        }
    }
}

/**
 * 需要绑定输入框
 */
class loginCotentBtn extends groupBtn {
    delBtnNode;
    editbox;
    constructor(node, downCallback, group) {
        super(node, downCallback, group);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);//嗯 这里的写法有点奇怪
        this.editbox = cc.find('editbox', this.node).getComponent(cc.EditBox);
        this.delBtnNode = cc.find('deleteBtn', this.node);
        this.delBtnNode.on(cc.Node.EventType.TOUCH_END, this.delBtnDown, this);
        this.editbox.node.on('text-changed', this.editBoxChange, this);
        this.editbox.node.on('editing-did-began', this.editBoxBegin, this);
    }
    editBoxChange() {
        this.delBtnNode.active = this.editbox.string == "" ? false : true;
    }
    editBoxBegin() {
        if (!this.isSelect) this.touchEnd();
        this.delBtnNode.active = this.editbox.string == "" ? false : true;
    }
    delBtnDown() {
        this.editbox.string = '';
        this.delBtnNode.active = false;
        this.touchEnd();
    }
}