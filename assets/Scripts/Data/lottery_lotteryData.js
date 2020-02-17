import SingletonBase from "../Singleton/SingletonBase";
import { lottery_EventDefine } from "./lottery_EventDefine";

export default class lottery_lotteryData extends SingletonBase {
    //模拟开奖
    simulated = false;
    //什么环境
    isLocal = true;
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
    //荷官端是否通过
    isPass = false;
    //token
    token = '';
    //当前页面tag
    pageTag = 0;

    network = {
        'httpServer': "",
        'socketIP': "",
        'socketPort': ""
    }


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
    /*--------------------------------视频链接-------------------------------------*/
    _videoUrl = {
        master:
        {
            HD: "ws://stattws.9hrb.vip/lobbyB/L01",
            SD: "ws://stattws.9hrb.vip/lobbyS/L01"
        },
        vice:
        {
            HD: "ws://stattws.9hrb.vip/lobbyB/L01-1",
            SD: "ws://stattws.9hrb.vip/lobbyS/L01-1"
        }
    }

    set videoUrl(value) {
        if (this._videoUrl != value) {
            this._videoUrl = value;
            cc.systemEvent.emit(lottery_EventDefine.URL_CHANGE);
        }
    }

    get videoUrl() {
        return this._videoUrl;
    }
}