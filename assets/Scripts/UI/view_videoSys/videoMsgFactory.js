const videoStageTime = [16, 10, , 8, 7, 10]; //16+10+8+7+10 = 51秒
//消息工厂,想把监听也放在这里,不知道对不对
export default class videosMsgFatory {
    static _root;
    static ins() {
        if (!this._root)
            this._root = new videosMsgFatory();
        return this._root;
    }

    //标准流程
    stanardFlow = [[1], [2], [3], [4], [5], [6, 7]];
    //数组队列
    _msgList = [];
    //当前期类型
    period = 2; // -1第一期 0 常规期 1 最后一期 ,2封盘

    /**第一期开盘特殊处理 */
    firstToDay() {
        this._msgList = this.anlyArr([[1, 10000]]);
    }
    /**最后一期开盘特殊处理*/
    endToDay() {
        this._msgList = [];
    }
    /**常规期处理*/
    commonToDay() {
        this._msgList = this.anlyArr(this.stanardFlow);
    }
    /**封盘*/
    closePanToDay() {
        this._msgList = this.anlyArr([[7, 3000]]);
    }
    /**获取消息队列*/
    get msgList() {
        switch (this.period) {
            case -1:
                this.firstToDay();
                break;
            case 0:
                this.commonToDay();
                break;
            case 1:
                this.endToDay();
                break;
            case 2:
                this.closePanToDay();
                break;
            default:
                this._msgList = [];
                break;
        }
        return this._msgList;
    }
    /**设置倒计时*/
    set countDownTime(time) {
        for (let one of this._msgList) {
            if (one.type == 2) {
                one.data = time;
                return;
            }
        }
        console.log("没有倒计时序列？？？程序已经错了");
    }
    /**分析数组 */
    anlyArr() {
        let arr = [];
        for (let one of arguments[0]) {
            arr.push(new videosMsg(one[0], one[1]));
        }
        return arr;
    }
    /**切换期数*/
    changePeriod(data) {
        this.period = data;
    }
}

//单个视频消息
class videosMsg {
    type;//类型
    data;//数据
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}