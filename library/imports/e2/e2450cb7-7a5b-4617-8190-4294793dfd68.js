"use strict";
cc._RF.push(module, 'e2450y3eltGF4GQQpR5Pf1o', 'lottery_Utils');
// Scripts/Core/Tools/lottery_Utils.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonBase2 = require("../../Singleton/SingletonBase");

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

var _lottery_BaseResLoad = require("../ResHandle/lottery_BaseResLoad");

var _lottery_BaseResLoad2 = _interopRequireDefault(_lottery_BaseResLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Utils = function (_SingletonBase) {
    _inherits(Utils, _SingletonBase);

    function Utils() {
        _classCallCheck(this, Utils);

        return _possibleConstructorReturn(this, (Utils.__proto__ || Object.getPrototypeOf(Utils)).call(this));
    }

    _createClass(Utils, [{
        key: "addClickEvent",
        value: function addClickEvent(node, target, component, handler) {
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = target;
            eventHandler.component = component;
            eventHandler.handler = handler;

            var clickEvents = node.getComponent(cc.Button).clickEvents;
            clickEvents.push(eventHandler);
        }
    }, {
        key: "addSlideEvent",
        value: function addSlideEvent(node, target, component, handler) {
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = target;
            eventHandler.component = component;
            eventHandler.handler = handler;

            var slideEvents = node.getComponent(cc.Slider).slideEvents;
            slideEvents.push(eventHandler);
        }
        /*
        将字符串转换成整数
        */

    }, {
        key: "getInt",
        value: function getInt(str) {
            if (!str) return 0;
            var num = Number.parseInt(str);
            if (!num) num = 0;
            return num;
        }
        /*
        将字符串转换成浮点数
        */

    }, {
        key: "getFloat",
        value: function getFloat(str) {
            if (!str) return 0;
            var num = Number.parseFloat(str);
            if (!num) num = 0;
            return num;
        }

        /**
         * 将一个数四舍五入,flag为true表示当num为整数时，四舍五入后强制需要小数点
         * 例如：当num为100时，如果flag为true，fixNum为3，则返回100.000， 如果flag为false则返回100
         */

    }, {
        key: "getRoundNum",
        value: function getRoundNum(num, fixNum, flag) {
            num = parseFloat(num + "");
            if (flag) {
                return num.toFixed(fixNum);
            }
            var str = num + "";
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

    }, {
        key: "check",
        value: function check(obj, defaultdata) {
            if (obj == null || obj == undefined) {
                console.log("obj: " + obj + " is null:" + defaultdata);
                return defaultdata;
            }
            return obj;
        }

        /**检测对象是否为null
         * obj:被检测对象
         * 返回bool值
         */

    }, {
        key: "checkBL",
        value: function checkBL(obj) {
            if (obj === null || obj === undefined || obj === "") {
                return false;
            }
            return true;
        }
    }, {
        key: "checkNumber",
        value: function checkNumber(obj) {
            if (typeof obj === "number") {
                return true;
            }
            return false;
        }
    }, {
        key: "checkBoolean",
        value: function checkBoolean(obj) {
            if (typeof obj === "boolean") {
                return true;
            }
            return false;
        }
    }, {
        key: "checkString",
        value: function checkString(obj) {
            if (typeof obj === "string") {
                return true;
            }
            return false;
        }
    }, {
        key: "checkNull",
        value: function checkNull(obj) {
            if (obj === null || obj === undefined) {
                return true;
            }
            return false;
        }

        //  判断对象是否无数据

    }, {
        key: "checkObjIsEmpty",
        value: function checkObjIsEmpty(obj) {
            var isEmpty = true;

            for (var i in obj) {
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

    }, {
        key: "dateFormatByType",
        value: function dateFormatByType(time, stamp) {
            var tostring = function tostring(num) {
                if (num < 10) return "0" + num;else return "" + num;
            };
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

    }, {
        key: "getShortTime",
        value: function getShortTime(time, stamp) {
            var date = new Date(time);
            var str = "";
            if (stamp.includes("YY")) {
                var year = date.getFullYear();
                stamp = stamp.replace("YY", year);
            }
            if (stamp.includes("MM")) {
                var month = date.getMonth();
                str = (month + 1 < 10 ? "0" : "") + (month + 1);
                stamp = stamp.replace("MM", str);
            }
            if (stamp.includes("dd")) {
                var day = date.getDate();
                str = (day < 10 ? "0" : "") + day;
                stamp = stamp.replace("dd", str);
            }
            if (stamp.includes("hh")) {
                var hour = date.getHours();
                str = (hour < 10 ? "0" : "") + hour;
                stamp = stamp.replace("hh", str);
            }
            if (stamp.includes("mm")) {
                var min = date.getMinutes();
                str = (min < 10 ? "0" : "") + min;
                stamp = stamp.replace("mm", str);
            }
            if (stamp.includes("ss")) {
                var second = date.getSeconds();
                str = (second < 10 ? "0" : "") + second;
                stamp = stamp.replace("ss", str);
            }
            return stamp;
        }

        /**
         * 获取小数位数
         */

    }, {
        key: "getDecimalNum",
        value: function getDecimalNum(num) {
            var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".";

            var str = num + "";
            var arr = str.split(flag);
            return arr[1] ? arr[1].length : 0;
        }

        /**
         * 格式化金钱显示, num为金钱数，digit为位数，flag为达到位数后插入的标志
         * 例如：num = 10000, digit = 3, flag = "," 返回为10,000
         */

    }, {
        key: "formatMoneyShow",
        value: function formatMoneyShow(num) {
            var digit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
            var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ",";

            var s = num + "";
            var arr = s.split(".");
            var newstr = "";
            var len = arr[0].length;
            var mod = len % digit;
            var startIndex = mod ? mod : digit;
            newstr += (mod ? s.substr(0, mod) : s.substr(0, digit)) + (len > digit ? flag : "");
            for (var i = startIndex; i < len; i += digit) {
                newstr += s.substr(i, digit) + (i < len - digit ? flag : "");
            }
            return newstr + (arr[1] ? "." + arr[1] : "");
        }
    }, {
        key: "makeDir",
        value: function makeDir(path) {
            var folders = path.split("/");
            if (folders == null) {
                return false;
            }
            var dir = "";
            for (var i = 0; i < folders.length - 1; i++) {
                dir = dir + folders[i] + "/";
                jsb.fileUtils.createDirectory(dir);
            }
            return true;
        }
        /*
            根据16进制颜色值字符串 计算RGB颜色值 返回cc.color
        */

    }, {
        key: "getColorByString",
        value: function getColorByString(colorstr) {
            if (colorstr.length < 6) {
                cc.error("length < 6");
                return cc.Color.WHITE;
            } else {
                return cc.Color.BLACK.fromHEX(colorstr);
            }
        }
        /**
         * 处理number ,保留小数点后指定位数 其余部分直接舍弃，不够位数不补全
         * @param {*} num  需要处理的number
         * @param {*} fixed 保留的位数
         */

    }, {
        key: "FixedNumber",
        value: function FixedNumber(num, fixed) {
            fixed = Math.pow(10, fixed);
            num = Math.floor(num * fixed) / fixed;
            return num;
        }
        /**
        * 替换图片
        * @param {*cc.Sprite} sprite cc.sprtie对象
        * @param {*string} spritename 图片名称
        * @param {*string} atlasname 图集名称
        */

    }, {
        key: "setSprite",
        value: function setSprite(sprite, spritename, atlasname) {
            var _this2 = this;

            if (atlasname && !this.atlasDic[atlasname]) {
                !this.atlasEventDic[atlasname] && (this.atlasEventDic[atlasname] = []);
                this.atlasEventDic[atlasname].push(function () {
                    _this2.setSprite(sprite, spritename, atlasname);
                });
                _lottery_BaseResLoad2.default.getInstance().LoadByKey(atlasname, 'Altas/' + atlasname, function (err, res) {
                    if (err) {
                        cc.warn("图集加载失败：" + atlasname + "    " + err);
                        return;
                    }
                    _this2.atlasDic[atlasname] = res;
                    if (_this2.atlasEventDic[atlasname]) {
                        for (var index = 0; index < _this2.atlasEventDic[atlasname].length; index++) {
                            var element = _this2.atlasEventDic[atlasname][index];
                            element();
                        }
                        delete _this2.atlasEventDic[atlasname];
                    }
                }, cc.SpriteAtlas);
                return;
            }
            sprite.spriteFrame = this.atlasDic[atlasname].getSpriteFrame(spritename);
        }
    }], [{
        key: "_onNewObject",
        value: function _onNewObject() {
            var one = new Utils();
            one.atlasDic = [];
            one.atlasEventDic = [];
            return one;
        }
    }]);

    return Utils;
}(_SingletonBase3.default);

exports.default = Utils;
module.exports = exports["default"];

cc._RF.pop();