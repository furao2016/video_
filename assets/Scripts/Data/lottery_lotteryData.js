import SingletonBase from "../Singleton/SingletonBase";

export default class lottery_lotteryData extends SingletonBase {
    //用户ID
    userId = null;
    //用户名字
    userName = null;
    //可选彩种列表
    roleList = null;
    //所选择的彩种code
    lotteryCode = null;
    //当前彩票期数
    expect = 1115;
    //下一期
    nestExpect = 1116;
    //指定的开奖时间
    awardTime = 0;
    //开奖结果
    awardResult = [1, 2, 3];
    //模拟开奖
    simulated = true;
    
    static _onNewObject() {
        let one = new lottery_lotteryData();
        return one;
    }

    updataData(data) {
        for (let one in data) {
            if (this.hasOwnProperty(one))
                this[one] = data[one];
        }
    }
}