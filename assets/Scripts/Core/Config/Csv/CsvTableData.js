import CsvTableLine from "CsvTableLine"
/*
读取CSV文件的解析类
*/
let cutChar = ",";
export default class CsvTableData {
    title = {}
    texArray = []
    initData(data, col) {
        this.texArray = data.split("\r\n");
        if (col > 0)
            this.texArray.splice(0, col);
        var mtitle = this.texArray[0].split(cutChar);
        for (var i = 0; i < mtitle.length; i++) {
            this.title[mtitle[i]] = i;
        }
        this.texArray.splice(0, 1);//去掉第一行的标题 key
        this.texArray.splice(this.texArray.length - 1, 1);//去除最后一个空的元素
        for (var i = 0; i < this.texArray.length; i++) {
            this.texArray[i] = CsvTableLine.Create(this.title, this.texArray[i]);
        }
    }
    getDatas() {
        return this.texArray;
    }
    static Create = function (data, col) {
        var tabledata = new CsvTableData();
        tabledata.initData(data, col);
        return tabledata;
    }
}