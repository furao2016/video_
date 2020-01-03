import CsvTableData from "CsvTableData"
import lottery_BaseResLoad from 'lottery_BaseResLoad'
import SingletonBase from 'SingletonBase'
/*
配置表读取类
*/
export default class ConfigReader extends SingletonBase {
    constructor() {
        super();
    }

    static _onNewObject() {
        return new ConfigReader()
    }

    ReadCsvRes(path, func, col = 0) {
        var callback = function (err, res) {
            if (!err)
                func(this.ReadCsv(res, col));
            else
                cc.error(err);
        }
        lottery_BaseResLoad.getInstance().LoadByKey(path, path, callback.bind(this));
    }
    /**
    将字符串数据按照csv格式转换成CsvTableData对象
    */
    ReadCsv(text, col) {
        return CsvTableData.Create(text, col);
    }
}