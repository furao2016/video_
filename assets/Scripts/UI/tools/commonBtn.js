export default class commonBtn {
    defaultNode;
    selectNode;
    isSelect = false;
    //按下回调
    downCallback = null;
    constructor(node, downCallback) {
        this.node = node;
        this.defaultNode = cc.find('default', this.node);
        this.selectNode = cc.find('select', this.node);
        this.downCallback = downCallback;
    }

    select(is) {
        this.selectNode.active = is;
        this.defaultNode.active = !is;
        this.isSelect = is;
    }
}

/**
 * 按下后，弹起的按钮
 */
export class radioBtn extends commonBtn {

    constructor(node, downCallback) {
        super(node, downCallback);
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancle, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    touchStart() {
        this.select(true);
    }
    touchCancle() {
        this.select(false);
    }
    touchEnd() {
        this.select(false);
        this.downCallback && this.downCallback()
    }
}
/**
 * 按下后不弹起的按钮，当前组其他按钮按下，才弹起
 */
export class groupBtn extends commonBtn {
    group = null;
    constructor(node, downCallback, group) {
        super(node, downCallback);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.group = group;
    }
    touchEnd() {
        if (this.isSelect) {
            this.select(false);
            this.group.index = null;
        }
        else {
            this.select(true);
            let index = this.group.arr.indexOf(this);
            if (this.group.index != null) {
                this.group.arr[this.group.index].select(false);
            }
            this.group.index = index;
            this.downCallback && this.downCallback();
        }
    }
}
