
var MsgDefine = {
    DOWN: {  //  下行
        SC_OK: '1',//建立长链接成功
        SC_VideoMsg: "2020",//建立长连接成功之后消息传递
        SC_KaiPan: "2010",  //开封盘
        SC_JianQi: '1014',//推送当前奖期
        SC_JIANQIU: '1013',//当前奖球数据
        SC_VideoUrl: '2015',//视频链接更改
        //////////////////////////////////////
        SC_OpenLotteryByHand: "2012",  //手动开奖
        SC_UpData: "2011",  //更新界面彩票数据
        SC_LoginManeger: "2008",  //登录管理员
        SC_ISSUE_DATA_BACK: "0106", //服务器推送：彩期数据更新推送消息
        SC_ForceDealerDownProcess: "0105", //服务器推送：强制下线
        SC_LotteryLssueCanOpenProcess: "2013",//请求手动开奖得数据
        SC_GetChatMsg: "2014",//请求手动开奖得数据返回
    },

    UP: {  // 上行
        Heart: "9999",//心跳包
        CS_KaiPan: "2010",//开封盘
        CS_OpenLotteryByHand: "2012",   //手动开奖
        CS_UpData: "2011",  //更新界面彩票数据
        CS_LoginManeger: "2008",    //登录管理员
        CS_LotteryLssueCanOpenProcess: "2013",//请求手动开奖得数据
        CS_IMFindAllRoomProcess: "2014",//请求手动开奖得数据
    },

    MsgEventKey: "ServerToClientSocketEventKey",
    LongConnect: {  //  长连接
        Connect: 1000, //连接
        Disconnect: 1001,  //断开
    }
}
module.exports = MsgDefine