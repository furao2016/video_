import SingletonBase from "../../Singleton/SingletonBase";

//数据类型
let EXHRDataType = cc.Enum({
    Undefined: 0,
    Text: 1,
    Binary: 2,
});
var Max_Try_Time = 4;
export default class HttpUtils extends SingletonBase {

    _reqListTimes = {}

    constructor() {
        super();
    }

    static _onNewObject() {
        return new HttpUtils()
    }
    /**
     * HTTP get;
     */
    httpGets(url, dataType, callback) {
        try {
            var xhr = new XMLHttpRequest()
            var self = this
            xhr.onload = function () {
                self.getRequestEnd(xhr, url, dataType, callback)
            }
            xhr.onerror = function (e) {
                self.getError(callback, url)
            }
            xhr.responseType = "arraybuffer"
            xhr.open("GET", url, true)
            xhr.send()
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    getError(callback, url) {
        try {
            if (callback) {
                callback(false, url)
            }
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    /**
     * get response;
     */
    getRequestEnd(xhr, url, dataType, callback) {
        try {
            var isOK = false
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = null;
                if (dataType == EXHRDataType.Binary) {
                    response = xhr.response;
                }
                else {
                    response = xhr.responseText;
                }
                isOK = true
                callback(isOK, response)
            }
            else {
                this.getRequestFailed(url, datatype, callback)
            }
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    /**
     * dispose get failed
     */
    getRequestFailed(url, datatype, callback) {
        try {
            if (!this._reqListTimes[url]) {
                this._reqListTimes[url] = 0;
            }
            if (this._reqListTimes[url] >= Max_Try_Time) {//达到最大尝试次数;
                if (callback) {
                    callback(false);
                }
            }
            else {
                this._reqListTimes[url]++;  //尝试次数自加;
                this.httpGets(url, datatype, callback);
            }
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    serializePost(data) {
        try {
            if (typeof data == 'string') {
                return data;
            }
            var arr = [];
            for (var param in data) {
                arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
            }
            return arr.join('&');
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    /**
     * http post请求
     */
    httpPost(url, params, callback, fail) {
        try {
            var timers = null;
            var xhr = new XMLHttpRequest()
            var self = this
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    clearTimeout(timers);
                    if (xhr.status >= 200 && xhr.status < 400) {
                        if (callback) {
                            if (xhr.responseText && typeof xhr.responseText == 'string') {
                                callback(JSON.parse(xhr.responseText));
                            } else {
                                callback(xhr.responseText)
                            }
                        }
                    } else {
                        self.getError(fail, url)
                    }
                }
            }
            xhr.onerror = function (e) {
                self.getError(fail, url)
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.timeout = 10000;// 5 seconds for timeout
            xhr.send(this.serializePost(params));
            timers = setTimeout(() => {
                xhr.abort();
            }, xhr.timeout);
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    ajaxGet(url, succ, fail, type, data) {
        /**
         * 传入方式默认为对象
         * */
        var options = {};
        /**
         * 默认为GET请求
         * */
        options.type = (type || "GET").toUpperCase();
        /**
         * 返回值类型默认为json
         * */
        options.dataType = options.dataType || 'json';
        /**
         * 默认为异步请求
         * */
        options.async = options.async || true;
        /* 超时处理 */
        options.timeout = options.timeout || 1500;
        /**
         * 对需要传入的参数的处理
         * */
        var params = data || '';
        var xhr, timers;
        /**
         * 创建一个 ajax请求
         * W3C标准和IE标准
         */
        if (window.XMLHttpRequest) {
            /**
             * W3C标准
             * */
            xhr = new XMLHttpRequest();
        } else {
            /**
             * IE标准
             * @type {ActiveXObject}
             */
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                clearTimeout(timers);
                if (status >= 200 && status < 300) {
                    succ && succ(JSON.parse(xhr.responseText), xhr.responseXML);
                } else {
                    fail && fail(status);
                }
            }
        };
        if (options.type == 'GET') {
            xhr.open("GET", url + '?' + params, options.async);
            xhr.send(null)
        } else if (options.type == 'POST') {
            /**
             *打开请求
            * */
            xhr.open('POST', options.url, options.async);
            /**
             * POST请求设置请求头
             * */
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            /**
             * 发送请求参数
             */
            xhr.send(params);
        }
        timers = setTimeout(() => {
            xhr.abort();
        }, options.timeout);
    }
}