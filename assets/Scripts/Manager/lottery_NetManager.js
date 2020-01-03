import SingletonBase from 'SingletonBase'
import lottery_RunInBackground from 'lottery_RunInBackground'

import lottery_BaseUrlLoad from 'lottery_BaseUrlLoad'
import lottery_HttpUtils from 'lottery_HttpUtils'
import lottery_TimeMgr from 'lottery_TimeMgr'
/*
网络管理脚本
*/
let httpServer = "";
let urlServer = "";
let token;
export default class NetManager extends SingletonBase {
    curServerTimeStamp = 0//服务器当前时间戳，本地做自增处理，不定时和服务器对比一次
    changeServerTimerID = 0
    serverTimeChangeEvent = {}//服务器时间更新事件组
    /*
    http请求存储数组
    [0]={url:"http://192.168.0.0/xxxx/xx/xx....",params}
    */
    httpPostList = []
    openHttpPost = false
    showTipsFunc = null
    hideTipsFunc = null

    constructor() {
        super();
    }

    static _onNewObject() {
        return new NetManager()
    }
    /**
     * 切换后台回调函数
     * @param {*} focus true 从后台切回来  false 切到后台
     */
    RunInBackground(focus) {
        if (focus) {//重新回到界面
            // this.HttpPost("lobby/validate/getTime", {}, function () { });   
        }
    }
    HttpPostFunc() {
        var self = this;
        var item = this.httpPostList[0];
        var endfunc = function () {
            self.httpPostList.splice(0, 1);
            self.hideTipsFunc && self.hideTipsFunc()
            if (self.httpPostList.length <= 0) {
                self.openHttpPost = false;
            }
            else {
                self.HttpPostFunc();
            }
        }
        lottery_HttpUtils.getInstance().httpPost(httpServer + item.url, item.params, (function (data) {
            var err = null;
            if (data.state == 1)
                err = data.errorMessage;
            if (data.thisTime)
                self.FreshServerTimeStamp(data.thisTime);
            token = data.token || data.logintoken || token;
            item.callback(err, data);
            endfunc.call(this);
        }).bind(this), (function (fail, url) {
            item.showErrorTips && this.ShowErrorTips()
            item.callback("error", null);
            endfunc.call(this);
        }).bind(this));
    }
    ShowErrorTips() {
        /*
        TODO:弹出网络连接错误的提示框，
        */
    }
    AddServerTime() {
        this.curServerTimeStamp += 1;
        for (const key in this.serverTimeChangeEvent) {
            const element = this.serverTimeChangeEvent[key];
            element(this.curServerTimeStamp);
        }
    }
    /*
    刷新服务器时间戳 毫秒
    */
    FreshServerTimeStamp(thistime) {
        this.curServerTimeStamp = Math.floor(thistime / 1000);
        var delay = thistime % 1000;
        delay = 1 - delay / 1000.0;
        if (this.changeServerTimerID !== 0) {
            lottery_TimeMgr.getInstance().closeTimer(this.changeServerTimerID);
            this.changeServerTimerID = 0;
        }
        this.changeServerTimerID = lottery_TimeMgr.getInstance().openTimer(this.AddServerTime, 1, 0, delay, this);
    }
    /*-----------------------------对外接口---------------------------------------*/
    /**初始化链接数据 */
    InitUrl(http, url) {
        // httpServer = http;
        // urlServer = url;
        lottery_RunInBackground.getInstance().RegestRunInBackground("NetManager", this.RunInBackground, this); //注册网页回调函数
    }
    /*
    和http服务器进行通信
    url 地址,不包含 ip和端口 eg.   http://192.168.0.185:7090/user/login    url = user/login
    params 参数 {键值对}
    callback 回调函数 参数 (err,obj)
    */
    HttpPost(url, params, callback, showErrorTips = false) {

        if (!params.token || params.token == "") {
            // params.token = token;
        } else {
            token = params.token;
        }

        var item = {
            "url": url,
            "params": params,
            "callback": callback,
            "showErrorTips": showErrorTips
        };
        this.httpPostList.push(item);
        this.showTipsFunc && this.showTipsFunc()
        if (!this.openHttpPost) {
            this.openHttpPost = true;
            this.HttpPostFunc();
        }
    }
    AjaxGet(url, succ, fail, type, data) {
        lottery_HttpUtils.getInstance().ajaxGet(url, succ, fail, type, data)
    }
    /**
     * 绑定服务器时间刷新事件
     * @param {*} tag 绑定事件的唯一标识
     * @param {*} callback 回调方法
     * @param {*} self 回调方法作用域
     */
    RegestServerTimeChangeEvent(tag, callback, self) {
        callback = self ? callback.bind(self) : callback;
        this.serverTimeChangeEvent[tag] = callback;
        callback(this.curServerTimeStamp);
    }
    /**
     * 解除绑定
     * @param {*} tag 绑定事件的唯一标识
     */
    UnRegestServerTimeChangeEvent(tag) {
        if (this.serverTimeChangeEvent[tag]) delete this.serverTimeChangeEvent[tag];
    }
    /**
     * 从服务器下载资源
     * @param {*} key 下载资源的唯一key
     * @param {*} url 资源路径
     * @param {*} suffix 资源后缀(类型 eg.    png   txt   jpg etc.)
     * @param {*} callback 回调方法
     */
    LoadUrl(key, url, suffix, callback) {
        lottery_BaseUrlLoad.getInstance().LoadUrl(key, urlServer + url, suffix, callback);
    }
    SetShowWaitPanelFunc(func) { this.showTipsFunc = func }
    SetHideWaitPanelFunc(func) { this.hideTipsFunc = func }
}