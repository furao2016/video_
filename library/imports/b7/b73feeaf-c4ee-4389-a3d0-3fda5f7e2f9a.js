"use strict";
cc._RF.push(module, 'b73fe6vxO5DiaPQP9pffi+a', 'lottery_ScrollViewNormalExtend');
// Scripts/Tools/lottery_ScrollViewNormalExtend.js

"use strict";

var overflowcount = 3; //定义超过显示范围的item数量
var deltaPos = 0; //滑动的差值 记录滑动时content的位置与初始的位置差
var checkTimes = 0; //检测次数 当滑动过快 item过小的时候 会导致一帧刷新几个item 所以声明此变量
/**对scrollview扩展，循环使用item,适用于数量多，且item的大小不会改变的情况*/
cc.Class({
    extends: cc.ScrollView,
    editor: CC_EDITOR && {
        menu: 'i18n:UIUtil/ScrollViewLoop'
    },
    properties: {
        itemNode: {
            default: null,
            type: cc.Node,
            tooltip: "动态创建的单个node节点对象"
        },
        itemprefab: { //动态创建的预制
            default: null,
            type: cc.Prefab,
            tooltip: "动态创建的单个预制对象"
        },
        viewMask: { //mask对象
            type: cc.Node,
            default: null,
            tooltip: "遮挡层的node对象，用于计算显示范围"
        },
        spacing: { //间隔值
            default: 3,
            tooltip: "间隔值"
        },
        /*---------------本地做记录使用数据 不对外使用-----------------*/
        mDirect: {
            default: "x",
            visible: false
        }, //"x" / "y"
        mValue: {
            default: "width",
            visible: false
        }, //"width" / "height"
        mAnchor: {
            default: "anchorX",
            visible: false
        }, //"anchorX" / "anchorY"
        dataCount: {
            default: 0,
            visible: false
        },
        maxItemCount: { //记录最大item数量
            default: overflowcount,
            visible: false
        },
        curItemCount: { //记录当前的item数量
            default: 0,
            visible: false
        },
        curShowItemIndex: { //记录当前显示的data序号
            default: [],
            visible: false
        },
        showTopPos: { //记录显示的最小值
            default: 0,
            visible: false
        },
        showDownPos: { //记录显示的最大值
            default: 0,
            visible: false
        },
        hideTopPos: { //记录隐藏的最小值
            default: 0,
            visible: false
        },
        hideDownPos: { //记录隐藏的最大值
            default: 0,
            visible: false
        },
        itemActiveList: { //存储使用中的item
            default: [],
            visible: false
        },
        itemDeactivePool: { //存储回收的item
            default: null,
            type: cc.NodePool,
            visible: false
        },
        lastContentPos: { //记录上一帧的content的位置 x/y
            default: 0,
            visible: false
        },
        checkdelta: { //检测差值
            default: 0,
            visible: false
        },
        itemway: {
            default: -1,
            visible: false
        },
        itemSynPos: {
            default: new cc.Vec2(0, 0),
            visible: false
        },
        cloneItem: {
            default: null,
            visible: false
        }
    },

    onLoad: function onLoad() {
        this.cloneItem = this.itemNode || this.itemprefab;
        this.itemDeactivePool = [];
        for (var index = 0; index < overflowcount; index++) {
            var item = cc.instantiate(this.cloneItem);
            item.active = false;
            this.content.addChild(item);
            this.itemDeactivePool.push(item);
        }
        this.curShowItemIndex = [0, 0];
        //设置滑动方向,目前只支持一个方向的滑动
        this.vertical = !this.horizontal;
        this.mDirect = this.horizontal ? "x" : "y";
        this.mValue = this.horizontal ? "width" : "height";
        this.mAnchor = this.horizontal ? "anchorX" : "anchorY";
        this.itemway = this.horizontal ? 1 : -1;
        this.lastContentPos = this.content[this.mDirect];
        this.CalculateRangePos();
    },
    update: function update(dt) {
        this._super(dt);
        if (this.isScrolling() || this.isAutoScrolling()) this.UpdateItemPos();
    },

    /**计算滑动显示的范围*/
    CalculateRangePos: function CalculateRangePos() {
        this.checkdelta = 0.25 * this.spacing;
        //计算最大item数量
        this.maxItemCount = Math.floor(this.viewMask[this.mValue] / this.spacing) + overflowcount;
        //设定位置相关数据
        this.showTopPos = this.lastContentPos - this.itemway * this.spacing;
        this.showDownPos = this.lastContentPos + this.itemway * (this.viewMask[this.mValue] + 0.5 * this.spacing);
        this.hideTopPos = this.lastContentPos - this.itemway * 1.5 * this.spacing;
        this.hideDownPos = this.lastContentPos + this.itemway * (this.viewMask[this.mValue] + 1.5 * this.spacing);
    },

    /**获取一个item */
    GetItem: function GetItem() {
        var item = this.itemDeactivePool.pop();
        if (!item) {
            item = cc.instantiate(this.cloneItem);
            this.content.addChild(item);
        }
        item.active = true;
        return item;
    },

    /**数组末尾增加一个item*/
    PopItem: function PopItem() {
        if (this.curItemCount >= this.maxItemCount) return;
        var item = this.GetItem();
        this.itemActiveList.push(item);
        this.itemSynPos[this.mDirect] = this.itemway * this.curShowItemIndex[1] * this.spacing;
        item.setPosition(this.itemSynPos);
        if (this.freshItemCallback) this.freshItemCallback(this.curShowItemIndex[1], item);
        this.curShowItemIndex[1]++;
        this.curItemCount++;
    },

    /**回收末尾item*/
    PushItem: function PushItem() {
        var item = this.itemActiveList.pop();
        this.itemDeactivePool.push(item);
        this.curShowItemIndex[1]--;
        this.curItemCount--;
    },

    /**在数组的头部增加一个item*/
    UnshiftItem: function UnshiftItem() {
        var item = this.GetItem();
        this.itemActiveList.unshift(item);
        this.curShowItemIndex[0]--;
        this.itemSynPos[this.mDirect] = this.itemway * this.curShowItemIndex[0] * this.spacing;
        item.setPosition(this.itemSynPos);
        if (this.freshItemCallback) this.freshItemCallback(this.curShowItemIndex[0], item);
        this.curItemCount++;
    },

    /**回收顶部的item*/
    ShiftItem: function ShiftItem() {
        var item = this.itemActiveList.shift();
        item.active = false;
        this.itemDeactivePool.push(item);
        this.curShowItemIndex[0]++;
        this.curItemCount--;
    },

    /**检测顶部回收*/
    CheckTopPop: function CheckTopPop() {
        if (this.horizontal) {
            if (this.content[this.mDirect] + this.itemActiveList[0][this.mDirect] < this.hideTopPos) this.ShiftItem();
        } else if (this.content[this.mDirect] + this.itemActiveList[0][this.mDirect] > this.hideTopPos) {
            this.ShiftItem();
        }
    },

    /**检测顶部创建*/
    CheckTopPush: function CheckTopPush() {
        if (this.curShowItemIndex[0] == 0) return;
        if (this.horizontal) {
            if (this.content[this.mDirect] + this.itemActiveList[0][this.mDirect] > this.showTopPos) this.UnshiftItem();
        } else if (this.content[this.mDirect] + this.itemActiveList[0][this.mDirect] < this.showTopPos) {
            this.UnshiftItem();
        }
    },

    /**检测底部回收*/
    CheckDownPop: function CheckDownPop() {
        if (this.horizontal) {
            if (this.content[this.mDirect] + this.itemActiveList[this.curItemCount - 1][this.mDirect] > this.hideDownPos) this.PushItem();
        } else if (this.content[this.mDirect] + this.itemActiveList[this.curItemCount - 1][this.mDirect] < this.hideDownPos) {
            this.PushItem();
        }
    },

    /**检测底部创建*/
    CheckDownPush: function CheckDownPush() {
        if (this.curShowItemIndex[1] == this.dataCount) {
            return;
        }
        if (this.horizontal) {
            if (this.content[this.mDirect] + this.itemActiveList[this.curItemCount - 1][this.mDirect] < this.showDownPos) {
                this.PopItem();
            }
        } else if (this.content[this.mDirect] + this.itemActiveList[this.curItemCount - 1][this.mDirect] > this.showDownPos) {
            this.PopItem();
        }
    },

    /**刷新item位置*/
    UpdateItemPos: function UpdateItemPos() {
        deltaPos = this.content[this.mDirect] - this.lastContentPos;
        if (Math.abs(deltaPos) < this.checkdelta) return;
        checkTimes = Math.ceil(Math.abs(deltaPos) / this.spacing);
        while (checkTimes > 0) {
            checkTimes--;
            if (this.horizontal) {
                if (deltaPos < 0 && this.curShowItemIndex[1] < this.dataCount) {
                    //向上滑动
                    this.CheckTopPop(); //检测顶部回收
                    this.CheckDownPush(); //检测底部创建
                } else if (deltaPos > 0 && this.curShowItemIndex[0] > 0) {
                    //向下滑动
                    this.CheckDownPop(); //检测底部回收
                    this.CheckTopPush(); //检测顶部创建
                }
            } else {
                if (deltaPos > 0 && this.curShowItemIndex[1] < this.dataCount) {
                    //向上滑动
                    this.CheckTopPop(); //检测顶部回收
                    this.CheckDownPush(); //检测底部创建
                } else if (deltaPos < 0 && this.curShowItemIndex[0] > 0) {
                    //向下滑动
                    this.CheckDownPop(); //检测底部回收
                    this.CheckTopPush(); //检测顶部创建
                }
            }
        }
        this.lastContentPos = this.content[this.mDirect];
    },


    /*-----------------------------对外接口-------------------------------------*/
    /**初始化item数量 注册回调函数 */
    InitItemData: function InitItemData(count, callback, self) {
        if (self) this.freshItemCallback = callback.bind(self);else this.freshItemCallback = callback;
        this.dataCount = count;
        this.content[this.mValue] = this.dataCount * this.spacing;
        if (count > this.maxItemCount) count = this.maxItemCount;
        for (var index = 0; index < count; index++) {
            this.PopItem();
        }
    },

    /**增加一个item*/
    AddItemData: function AddItemData() {
        if (this.curShowItemIndex[1] == this.dataCount) {
            this.PopItem();
        }
        this.dataCount++;
        this.content[this.mValue] = this.dataCount * this.spacing;
    },

    /**增加多个item */
    AddItemDataNum: function AddItemDataNum(num) {
        for (var i = 0; i < num; i++) {
            this.AddItemData();
        }
    },

    /**删除一个item    index:数据的序列号 */
    DeleteItem: function DeleteItem(index) {
        this.stopAutoScroll();
        if (index < this.curShowItemIndex[0]) {
            //显示范围上方
            this.content[this.mDirect] -= this.spacing;
        }
        index = index - this.curShowItemIndex[0];
        for (var i = index < 0 ? 0 : index; i < this.itemActiveList.length; i++) {
            var element = this.itemActiveList[i];
            this.freshItemCallback(this.curShowItemIndex[0] + i, element);
        }
        this.dataCount--;
        this.content[this.mValue] = this.dataCount * this.spacing;
        if (this.content[this.mValue] < this.content[this.mDirect] + this.viewMask[this.mValue]) {
            this.scrollToBottom();
        }
    },

    /**刷新一个item*/
    UpdateItem: function UpdateItem(index) {
        if (this.curShowItemIndex[0] <= index <= this.curShowItemIndex[1]) {
            if (this.freshItemCallback) {
                var _index = index - this.curShowItemIndex[0];
                this.freshItemCallback(index, this.itemActiveList[_index]);
            }
        }
    },

    /**反注册更新item事件*/
    UnRegestUpdateItem: function UnRegestUpdateItem() {
        this.freshItemCallback = null;
    },

    /**清楚所有数据*/
    ClearData: function ClearData(callback) {
        this.stopAutoScroll();
        if (this.horizontal) this.itemSynPos[this.mDirect] = -this.viewMask[this.mValue] * this.viewMask[this.mAnchor];else this.itemSynPos[this.mDirect] = this.viewMask[this.mValue] * (1 - this.viewMask[this.mAnchor]);

        this.content.setPosition(this.itemSynPos);
        for (var index = 0; index < this.itemActiveList.length; index++) {
            var element = this.itemActiveList[index];
            element.active = false;
            this.itemDeactivePool.push(element);
        }
        this.itemActiveList.splice(0, this.curItemCount);
        this.curItemCount = 0;
        this.content.height = 0;
        this.curShowItemIndex = [0, 0];
        this.lastContentPos = this.itemSynPos[this.mDirect];
        if (callback) callback();
    },

    /**
     * 当间隔值动态发生改变后 调用接口
     * @param {*} space 间隔值
     */
    SpacingChanged: function SpacingChanged(space) {
        var _this = this;

        if (this.itemActiveList.length <= 0) return;
        this.ClearData(function () {
            _this.CalculateRangePos();
            _this.InitItemData(_this.dataCount, _this.freshItemCallback);
        });
    },


    //设置新的item对象
    setItemNode: function setItemNode(item) {
        this.content.removeAllChildren();
        this.itemNode = item;
        this.cloneItem = this.itemNode || this.itemprefab;
        this.itemDeactivePool = [];
        for (var index = 0; index < overflowcount; index++) {
            var _item = cc.instantiate(this.cloneItem);
            _item.active = false;
            this.content.addChild(_item);
            this.itemDeactivePool.push(_item);
        }
        this.curShowItemIndex = [0, 0];
        //设置滑动方向,目前只支持一个方向的滑动
        this.vertical = !this.horizontal;
        this.mDirect = this.horizontal ? "x" : "y";
        this.mValue = this.horizontal ? "width" : "height";
        this.mAnchor = this.horizontal ? "anchorX" : "anchorY";
        this.itemway = this.horizontal ? 1 : -1;
        this.lastContentPos = this.content[this.mDirect];
        this.CalculateRangePos();
    }
});

cc._RF.pop();