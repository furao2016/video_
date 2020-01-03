import SingletonBase from "../../Singleton/SingletonBase";

export default class BaseUrlLoad extends SingletonBase {

    keyList = []
    urlList = []
    callbackList = []
    suffixList = []
    curKey = ""
    curUrl = ""
    curCallback = null
    curSuffix = ""
    isLoading = false

    constructor() {
        super();
    }
    
    static _onNewObject() {
        return new BaseUrlLoad()
    }
    /**
    从远程服务器获取资源
    @param url 远程下载链接
    @param suffix 资源类型 通常是填后缀，eg.  png txt jpg...
    @param callback 下载完成回掉函数 
    */
    LoadUrl(key, url, suffix, callback) {
        this.keyList.push(key);
        this.urlList.push(url);
        this.suffixList.push(suffix);
        this.callbackList.push(callback);
        this.load();
    }
    /*--------------------------------------内部私有方法------------------------------------- */
    loadHead() {
        this.isLoading = true;
        this.curKey = this.keyList.splice(0, 1)[0];
        this.curUrl = this.urlList.splice(0, 1)[0];
        this.curCallback = this.callbackList.splice(0, 1)[0];
        this.curSuffix = this.suffixList.splice(0, 1)[0];
        cc.loader.load({ "url": this.curUrl, "type": this.curSuffix }, this.loadCallback.bind(this));
    }
    load() {
        if (this.isLoading)
            return;
        this.loadHead();
    }
    loadCallback(err, data) {
        if (err) {//下载出错
        }
        else {
        }
        this.curCallback(err, data, this.curKey)
        if (this.urlList.length > 0) {
            this.loadHead();
        }
        else {
            this.isLoading = false;
        }
    }
}