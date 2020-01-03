"use strict";
cc._RF.push(module, 'a57a7eTjf9PppHeUTACJ1RG', 'ConfigReader');
// Scripts/Core/Config/ConfigReader.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CsvTableData = require('CsvTableData');

var _CsvTableData2 = _interopRequireDefault(_CsvTableData);

var _lottery_BaseResLoad = require('lottery_BaseResLoad');

var _lottery_BaseResLoad2 = _interopRequireDefault(_lottery_BaseResLoad);

var _SingletonBase2 = require('SingletonBase');

var _SingletonBase3 = _interopRequireDefault(_SingletonBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
配置表读取类
*/
var ConfigReader = function (_SingletonBase) {
    _inherits(ConfigReader, _SingletonBase);

    function ConfigReader() {
        _classCallCheck(this, ConfigReader);

        return _possibleConstructorReturn(this, (ConfigReader.__proto__ || Object.getPrototypeOf(ConfigReader)).call(this));
    }

    _createClass(ConfigReader, [{
        key: 'ReadCsvRes',
        value: function ReadCsvRes(path, func) {
            var col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var callback = function callback(err, res) {
                if (!err) func(this.ReadCsv(res, col));else cc.error(err);
            };
            _lottery_BaseResLoad2.default.getInstance().LoadByKey(path, path, callback.bind(this));
        }
        /**
        将字符串数据按照csv格式转换成CsvTableData对象
        */

    }, {
        key: 'ReadCsv',
        value: function ReadCsv(text, col) {
            return _CsvTableData2.default.Create(text, col);
        }
    }], [{
        key: '_onNewObject',
        value: function _onNewObject() {
            return new ConfigReader();
        }
    }]);

    return ConfigReader;
}(_SingletonBase3.default);

exports.default = ConfigReader;
module.exports = exports['default'];

cc._RF.pop();