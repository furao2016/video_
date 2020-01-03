"use strict";
cc._RF.push(module, '80d80G1gG9K/ZqfdQN5rNSk', 'CsvTableLine');
// Scripts/Core/Config/Csv/CsvTableLine.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lottery_Utils = require("lottery_Utils");

var _lottery_Utils2 = _interopRequireDefault(_lottery_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
读取csv文件一行数据解析类
*/
var cutChar = ";";
var CsvTableLine = (_temp = _class = function () {
    function CsvTableLine() {
        _classCallCheck(this, CsvTableLine);

        this.title = {};
        this.texArray = [];
    }

    _createClass(CsvTableLine, [{
        key: "init",
        value: function init(t, tex) {
            this.title = t;
            this.texArray = tex.split(",");
        }
    }, {
        key: "getInt",
        value: function getInt(title) {
            return _lottery_Utils2.default.getInstance().getInt(this.texArray[this.title[title]]);
        }
    }, {
        key: "getIntArray",
        value: function getIntArray(title) {
            var str = this.texArray[this.title[title]];
            if (!str) return [];
            str = str.replace("[", "");
            str = str.replace("]", "");
            var strsub = str.split(cutChar);
            var intArray = [];
            for (var i = 0; i < strsub.length; i++) {
                intArray.push(_lottery_Utils2.default.getInstance().getInt(strsub[i]));
            }
            return intArray;
        }
    }, {
        key: "getFloat",
        value: function getFloat(title) {
            return _lottery_Utils2.default.getInstance().getFloat(this.texArray[this.title[title]]);
        }
    }, {
        key: "getFloatArray",
        value: function getFloatArray(title) {
            var str = this.texArray[this.title[title]];
            if (!str) return [];
            str = str.replace("[", "");
            str = str.replace("]", "");
            var strsub = str.split(cutChar);
            var floatArray = [];
            for (var i = 0; i < strsub.length; i++) {
                floatArray.push(_lottery_Utils2.default.getInstance().getFloat(strsub[i]));
            }
            return floatArray;
        }
    }, {
        key: "getString",
        value: function getString(title) {
            return this.texArray[this.title[title]];
        }
    }]);

    return CsvTableLine;
}(), _class.Create = function (title, tex) {
    var line = new CsvTableLine();
    while (tex.includes(" ")) {
        tex = tex.replace(" ", "");
    }
    line.init(title, tex);
    return line;
}, _temp);
exports.default = CsvTableLine;
module.exports = exports["default"];

cc._RF.pop();