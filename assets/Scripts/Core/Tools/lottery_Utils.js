import SingletonBase from "../../Singleton/SingletonBase";
import BaseResLoad from "../ResHandle/lottery_BaseResLoad";

export default class Utils extends SingletonBase {

    constructor() {
        super();
    }

    static _onNewObject() {
        let one = new Utils();
        one.atlasDic = [];
        one.atlasEventDic = [];
        return one;
    }

    addClickEvent(node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler()
        eventHandler.target = target
        eventHandler.component = component
        eventHandler.handler = handler

        var clickEvents = node.getComponent(cc.Button).clickEvents
        clickEvents.push(eventHandler)
    }

    addSlideEvent(node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler()
        eventHandler.target = target
        eventHandler.component = component
        eventHandler.handler = handler

        var slideEvents = node.getComponent(cc.Slider).slideEvents
        slideEvents.push(eventHandler)
    }
    /*
    将字符串转换成整数
    */
    getInt(str) {
        if (!str)
            return 0;
        var num = Number.parseInt(str);
        if (!num)
            num = 0;
        return num;
    }
    /*
    将字符串转换成浮点数
    */
    getFloat(str) {
        if (!str)
            return 0;
        var num = Number.parseFloat(str);
        if (!num)
            num = 0;
        return num;
    }

    /**
     * 将一个数四舍五入,flag为true表示当num为整数时，四舍五入后强制需要小数点
     * 例如：当num为100时，如果flag为true，fixNum为3，则返回100.000， 如果flag为false则返回100
     */
    getRoundNum(num, fixNum, flag) {
        num = parseFloat(num + "");
        if (flag) {
            return num.toFixed(fixNum);
        }
        let str = num + "";
        if (str.indexOf(".") == -1) {
            return parseInt(str);
        }
        return num.toFixed(fixNum);
    }

    /**检测变量是否为null || undefined
    * obj:被检测变量
    * defaultdata：如果为空，返回指定的默认值
    * 返回传入的默认值
    */
    check(obj, defaultdata) {
        if (obj == null || obj == undefined) {
            console.log("obj: " + obj + " is null:" + defaultdata)
            return defaultdata
        }
        return obj
    }

    /**检测对象是否为null
     * obj:被检测对象
     * 返回bool值
     */
    checkBL(obj) {
        if (obj === null || obj === undefined || obj === "") {
            return false
        }
        return true
    }

    checkNumber(obj) {
        if (typeof (obj) === "number") {
            return true
        }
        return false
    }

    checkBoolean(obj) {
        if (typeof (obj) === "boolean") {
            return true
        }
        return false;
    }

    checkString(obj) {
        if (typeof (obj) === "string") {
            return true
        }
        return false
    }

    checkNull(obj) {
        if (obj === null || obj === undefined) {
            return true
        }
        return false
    }

    //  判断对象是否无数据
    checkObjIsEmpty(obj) {
        let isEmpty = true;

        for (let i in obj) {
            isEmpty = false;
            break;
        }
        return isEmpty;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    将时间格式化  time 时间  单位 秒  stamp 格式 字符串 "dd-hh-mm-ss"
    eg  time = 3599 stamp = "hh-mm-ss"=> return "00-59-59"
    eg  time = 3599 stamp = "mm-ss"=> return "59-59"
    */
    dateFormatByType(time, stamp) {
        let tostring = function (num) {
            if (num < 10)
                return "0" + num;
            else
                return "" + num;
        }
        if (stamp.includes("dd")) {
            stamp = stamp.replace("dd", tostring(Math.floor(time / 86400)));
            time = time % 86400;
        }
        if (stamp.includes("hh")) {
            stamp = stamp.replace("hh", tostring(Math.floor(time / 3600)));
            time = time % 3600;
        }
        if (stamp.includes("mm")) {
            stamp = stamp.replace("mm", tostring(Math.floor(time / 60)));
            time = time % 60;
        }
        if (stamp.includes("ss")) {
            stamp = stamp.replace("ss", tostring(time));
        }
        return stamp;
    }

    /**
     * 获得段日期格式，time为时间戳，stamp为字符串格式
     * MM月dd日hh：mm：ss 返回xx月xx日xx：xx：xx
     */
    getShortTime(time, stamp) {
        let date = new Date(time);
        let str = "";
        if (stamp.includes("YY")) {
            let year = date.getFullYear();
            stamp = stamp.replace("YY", year);
        }
        if (stamp.includes("MM")) {
            let month = date.getMonth();
            str = (month + 1 < 10 ? "0" : "") + (month + 1);
            stamp = stamp.replace("MM", str);
        }
        if (stamp.includes("dd")) {
            let day = date.getDate();
            str = (day < 10 ? "0" : "") + day;
            stamp = stamp.replace("dd", str);
        }
        if (stamp.includes("hh")) {
            let hour = date.getHours();
            str = (hour < 10 ? "0" : "") + hour;
            stamp = stamp.replace("hh", str);
        }
        if (stamp.includes("mm")) {
            let min = date.getMinutes();
            str = (min < 10 ? "0" : "") + min;
            stamp = stamp.replace("mm", str);
        }
        if (stamp.includes("ss")) {
            let second = date.getSeconds();
            str = (second < 10 ? "0" : "") + second;
            stamp = stamp.replace("ss", str);
        }
        return stamp;
    }

    /**
     * 获取小数位数
     */
    getDecimalNum(num, flag = ".") {
        let str = num + "";
        let arr = str.split(flag);
        return arr[1] ? arr[1].length : 0;
    }

    /**
     * 格式化金钱显示, num为金钱数，digit为位数，flag为达到位数后插入的标志
     * 例如：num = 10000, digit = 3, flag = "," 返回为10,000
     */
    formatMoneyShow(num, digit = 3, flag = ",") {
        let s = num + "";
        let arr = s.split(".");
        let newstr = "";
        let len = arr[0].length;
        let mod = len % digit;
        let startIndex = mod ? mod : digit;
        newstr += (mod ? s.substr(0, mod) : s.substr(0, digit)) + (len > digit ? flag : "");
        for (let i = startIndex; i < len; i += digit) {
            newstr += s.substr(i, digit) + (i < len - digit ? flag : "");
        }
        return newstr + (arr[1] ? ("." + arr[1]) : "");
    }

    makeDir(path) {
        var folders = path.split("/")
        if (folders == null) {
            return false
        }
        var dir = ""
        for (var i = 0; i < folders.length - 1; i++) {
            dir = dir + folders[i] + "/"
            jsb.fileUtils.createDirectory(dir)
        }
        return true
    }
    /*
        根据16进制颜色值字符串 计算RGB颜色值 返回cc.color
    */
    getColorByString(colorstr) {
        if (colorstr.length < 6) {
            cc.error("length < 6");
            return cc.Color.WHITE;
        }
        else {
            return cc.Color.BLACK.fromHEX(colorstr);
        }
    }
    /**
     * 处理number ,保留小数点后指定位数 其余部分直接舍弃，不够位数不补全
     * @param {*} num  需要处理的number
     * @param {*} fixed 保留的位数
     */
    FixedNumber(num, fixed) {
        fixed = Math.pow(10, fixed);
        num = Math.floor(num * fixed) / fixed
        return num
    }
    /**
    * 替换图片
    * @param {*cc.Sprite} sprite cc.sprtie对象
    * @param {*string} spritename 图片名称
    * @param {*string} atlasname 图集名称
    */
    setSprite(sprite, spritename, atlasname) {
        if (atlasname && !this.atlasDic[atlasname]) {
            !this.atlasEventDic[atlasname] && (this.atlasEventDic[atlasname] = [])
            this.atlasEventDic[atlasname].push(() => {
                this.setSprite(sprite, spritename, atlasname)
            })
            BaseResLoad.getInstance().LoadByKey(atlasname, 'Altas/' + atlasname, (err, res) => {
                if (err) {
                    cc.warn("图集加载失败：" + atlasname + "    " + err)
                    return;
                }
                this.atlasDic[atlasname] = res
                if (this.atlasEventDic[atlasname]) {
                    for (let index = 0; index < this.atlasEventDic[atlasname].length; index++) {
                        const element = this.atlasEventDic[atlasname][index];
                        element();
                    }
                    delete this.atlasEventDic[atlasname]
                }
            }, cc.SpriteAtlas)
            return;
        }
        sprite.spriteFrame = this.atlasDic[atlasname].getSpriteFrame(spritename)
    }
}