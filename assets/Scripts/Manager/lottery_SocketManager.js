import SingletonBase from "SingletonBase";
import lottery_BaseSocket from 'lottery_BaseSocket'
import lottery_TimeMgr from 'lottery_TimeMgr'

let SocketEnum = require("lottery_SocketEnum");
let ReConnectTimer = 5;//重连间隔时间 单位 秒
import SockMsgDefine from "lottery_SockMsgDefine";

let socktIP = "192.168.0.158";
let socketPort = "7050";
let socketParam = "";
export default class SocketManager extends SingletonBase {
    BaseSocketIns
    heartTime = 25//心跳包间隔时间 单位 秒
    heartTimerID = 0//心跳包计时器ID 
    reConnectTimerID = 0
    isreconnect = false
    curSocketState = SocketEnum.none//当前socket状态
    socketEventDic = {}
    loadingShowFunc = null
    loadingHideFunc = null
    reConnectSocketNum = 0  //断线重连次数

    constructor() {
        super();
    }

    static _onNewObject() {
        let _instance = new SocketManager();
        _instance.BaseSocketIns = new lottery_BaseSocket();
        _instance.BaseSocketIns.RegestMessageEvent(_instance.OnMessage.bind(_instance));
        _instance.BaseSocketIns.RegisterConnectEvent(_instance.OnConnect.bind(_instance))
        return _instance
    }
    _onDestroyObject() {
        if (this.curSocketState === SocketEnum.success)
            this.BaseSocketIns.close()
    }

    /**获取消息*/
    OnMessage(msg) {
        let data = null;
        if (msg.data) {
            data = JSON.parse(msg.data);
        }

        let msgId = data.codeBack;
        if (msgId != SockMsgDefine.UP.Heart) {//心跳包消息处理

        }
        if (data.code == 1) {//正确返回处理
            this.socketEventDic[msgId] && this.socketEventDic[msgId](data.data)
        }
        else if (data.code == 2) {//错误信息返回
            
        }
    }
    /**
     * 连接状态改变函数
     * @param {*} state 
     */
    OnConnect(state) {
        switch (state) {
            case SocketEnum.success:    //连接成功
                this.loadingHideFunc && this.loadingHideFunc()
                this.reConnectSocketNum = 0;    //重连次数
                this.isreconnect = false;
                if (this.reConnectTimerID !== 0) {
                    lottery_TimeMgr.getInstance().closeTimer(this.reConnectTimerID);
                    this.reConnectTimerID = 0;
                }
                //this.HeartOpen();//开启心跳包
                break;
            case SocketEnum.error:
            case SocketEnum.close:
                //this.HeartClose();//关闭心跳包
                this.socketEventDic[SockMsgDefine.LongConnect.Disconnect] && this.socketEventDic[SockMsgDefine.LongConnect.Disconnect]();
                this.ReConnect();//重连socket
                break;
            default:
                break;
        }
        this.curSocketState = state;
    }
    /**打开心跳包*/
    HeartOpen() {
        this.HeartClose();
        this.heartTimerID = lottery_TimeMgr.getInstance().openTimer(() => {
            let msg = {};
            msg.codeBack = SockMsgDefine.UP.Heart;
            msg.data = {};
            this.Send(JSON.stringify(msg), false);
        }, this.heartTime, -1, this.heartTime)
    }
    /**关闭心跳包*/
    HeartClose() {
        if (this.heartTimerID !== 0) {
            lottery_TimeMgr.getInstance().closeTimer(this.heartTimerID);
        }
    }
    /**重连socket */
    ReConnect() {
        this.loadingShowFunc && this.loadingShowFunc()
        if (this.curSocketState == SocketEnum.success)
            this.BaseSocketIns.close();
        var func = function () {
            this.reConnectSocketNum = this.reConnectSocketNum + 1;
            this.reConnectTimerID = 0;
            if (this.reConnectSocketNum >= 3) {
                this.reConnectSocketNum = 0;
                lottery_TimeMgr.getInstance().closeTimer(this.reConnectTimerID);
                this.close();
                return
            }
            this.Connect(socktIP, socketPort, socketParam);
        }
        if (this.reConnectTimerID === 0)
            this.reConnectTimerID = lottery_TimeMgr.getInstance().openTimer(func.bind(this), 0, 1, ReConnectTimer);
    }
    /*--------------------------------------对外接口--------------------------------------*/
    /**连接*/
    Connect(ip, port, param) {
        socktIP = ip || socktIP;
        socketPort = port || socketPort;
        socketParam = param || socketParam;
        if (param && param != "") {
            this.BaseSocketIns.init(socktIP, socketPort, socketParam)
        }
        else {
            //TODO: 没有设定连接参数的提示代码
        }
    }
    /**发送数据  发送成功返回true，失败返回false*/
    Send(data) {
        if (this.curSocketState && this.curSocketState != SocketEnum.success) {
            return false;
        }
        this.BaseSocketIns.send(data);
        return true
    }
    /**事件注册 */
    On(id, callback, self) {
        this.socketEventDic[id] = self ? callback.bind(self) : callback;
    }
    close() {
        this.HeartClose();
        this.BaseSocketIns.close();
    }
    SetLoadingShowAndHideFunc(show, hide) {
        this.loadingShowFunc = show
        this.loadingHideFunc = hide
    }
}