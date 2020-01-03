(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Core/Config/Csv/CsvTableData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fd04ah5XvpAO4juXYeYRZjv', 'CsvTableData', __filename);
// Scripts/Core/Config/Csv/CsvTableData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _CsvTableLine = require("CsvTableLine");

var _CsvTableLine2 = _interopRequireDefault(_CsvTableLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
读取CSV文件的解析类
*/
var cutChar = ",";
var CsvTableData = (_temp = _class = function () {
    function CsvTableData() {
        _classCallCheck(this, CsvTableData);

        this.title = {};
        this.texArray = [];
    }

    _createClass(CsvTableData, [{
        key: "initData",
        value: function initData(data, col) {
            this.texArray = data.split("\r\n");
            if (col > 0) this.texArray.splice(0, col);
            var mtitle = this.texArray[0].split(cutChar);
            for (var i = 0; i < mtitle.length; i++) {
                this.title[mtitle[i]] = i;
            }
            this.texArray.splice(0, 1); //去掉第一行的标题 key
            this.texArray.splice(this.texArray.length - 1, 1); //去除最后一个空的元素
            for (var i = 0; i < this.texArray.length; i++) {
                this.texArray[i] = _CsvTableLine2.default.Create(this.title, this.texArray[i]);
            }
        }
    }, {
        key: "getDatas",
        value: function getDatas() {
            return this.texArray;
        }
    }]);

    return CsvTableData;
}(), _class.Create = function (data, col) {
    var tabledata = new CsvTableData();
    tabledata.initData(data, col);
    return tabledata;
}, _temp);
exports.default = CsvTableData;
module.exports = exports["default"];

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CsvTableData.js.map
        