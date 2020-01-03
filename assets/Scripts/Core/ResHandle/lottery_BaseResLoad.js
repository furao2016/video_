import SingletonBase from "../../Singleton/SingletonBase";

/**
 * 基础资源加载类
 * 
 * 缺乏制定文件夹扫描加载
 */

export default class BaseResLoad extends SingletonBase {

    WaitList = []
    DoneList = []
    KeyList = []
    keyDic = {}
    ProgressList = []
    TypeList = []
    CurDownloadKey = null
    IsLoading = false

    constructor() {
        super();
    }

    static _onNewObject() {
        return new BaseResLoad()
    }
    _onDestroyObject() {
        this.IsLoading = false;
        this.KeyList = [];
        this.keyDic = {};
        this.WaitList = [];
        this.DoneList = [];
        this.ProgressList = [];
        this.TypeList = [];
    }
    DownloadRes() {
        if (this.KeyList.length <= 0) {//下载完成
            this.IsLoading = false;
        }
        else {//数组中要下载的列表还有
            //当前下载的资源完成
            if (this.CurDownloadKey == null || this.CurDownloadKey == "undefined") {
                this.CurDownloadKey = this.KeyList[0];//获取第一个key
                var self = this;
                this.IsLoading = true;
                var downFunc = function (err, obj) {
                    var deleteFunc = function () {
                        //删除KeyList中的第一个数据
                        self.KeyList.shift();
                        //删除等待列表中的key
                        delete (self.WaitList[self.CurDownloadKey]);
                        delete (self.DoneList[self.CurDownloadKey]);
                        delete (self.TypeList[self.CurDownloadKey]);
                        delete (self.ProgressList[self.CurDownloadKey]);
                        delete (self.keyDic[self.CurDownloadKey])
                    }
                    if (!err) {
                        //下载完成，
                        //将下载好的图片回调给传入的函数
                        if (self.DoneList[self.CurDownloadKey] != null && self.DoneList[self.CurDownloadKey] != "undefined") {
                            self.DoneList[self.CurDownloadKey](err, obj, self.CurDownloadKey);
                        }
                    }
                    else {
                        cc.error("当前下载失败，开始下一个" + err);
                    };
                    deleteFunc();
                    self.CurDownloadKey = null;
                    self.CheckUpdate();
                };
                if (this.TypeList[this.CurDownloadKey] && !this.ProgressList[this.CurDownloadKey])
                    cc.loader.loadRes(this.WaitList[this.CurDownloadKey], this.TypeList[this.CurDownloadKey], downFunc);
                else if (!this.TypeList[this.CurDownloadKey] && this.ProgressList[this.CurDownloadKey])
                    cc.loader.loadRes(this.WaitList[this.CurDownloadKey], this.ProgressList[this.CurDownloadKey], downFunc)
                else if (!this.TypeList[this.CurDownloadKey] && !this.ProgressList[this.CurDownloadKey])
                    cc.loader.loadRes(this.WaitList[this.CurDownloadKey], downFunc);
                else
                    cc.loader.loadRes(this.WaitList[this.CurDownloadKey], this.TypeList[this.CurDownloadKey], this.ProgressList[this.CurDownloadKey], downFunc);
            }
            else {
                //当前下载的未完成，继续等待完成
                cc.error("当前下载的未完成，继续等待完成");
            }
        }
    }
    CheckUpdate() {
        if (this.KeyList.length > 0) {
            //获取最后一个， 然后开始下载
            this.DownloadRes();
        }
        else {
            this.IsLoading = false;
        }
    }

    /*------------------------------对外接口---------------------------------*/
    /**
     * 根据key和路径有序加载
     * 加载Atlas资源的时候需要传入mtype = cc.SpriteAtlas
     */
    LoadByKey(key, url, callback, mtype = null, progress = null) {
        if (this.keyDic[key])
            return;

        var obj;
        if (mtype)
            obj = cc.loader.getRes(url, mtype);
        else
            obj = cc.loader.getRes(url);
        if (obj) {
            callback(null, obj, key)
            return;
        }

        this.keyDic[key] = true
        this.KeyList.push(key);
        this.WaitList[key] = url;
        this.DoneList[key] = callback;
        if (mtype)
            this.TypeList[key] = mtype;
        if (progress)
            this.ProgressList[key] = progress;
        if (this.IsLoading == false) {//开始下载
            this.DownloadRes();
        }
        return null;
    }

    LoadResDir(url, progress, callback) {
        cc.loader.loadResDir(url, progress, callback)
    }
}