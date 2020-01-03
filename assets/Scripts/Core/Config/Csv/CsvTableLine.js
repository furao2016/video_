import lottery_Utils from 'lottery_Utils'
/*
读取csv文件一行数据解析类
*/
let cutChar = ";";
export default class CsvTableLine {

    title = {}
    texArray = []

    init(t, tex) {
        this.title = t;
        this.texArray = tex.split(",");
    }
    getInt(title) {
        return lottery_Utils.getInstance().getInt(this.texArray[this.title[title]]);
    }
    getIntArray(title) {
        var str = this.texArray[this.title[title]];
        if (!str)
            return [];
        str = str.replace("[", "");
        str = str.replace("]", "");
        var strsub = str.split(cutChar);
        var intArray = [];
        for (var i = 0; i < strsub.length; i++) {
            intArray.push(lottery_Utils.getInstance().getInt(strsub[i]));
        }
        return intArray;
    }
    getFloat(title) {
        return lottery_Utils.getInstance().getFloat(this.texArray[this.title[title]]);
    }
    getFloatArray(title) {
        var str = this.texArray[this.title[title]];
        if (!str)
            return [];
        str = str.replace("[", "");
        str = str.replace("]", "");
        var strsub = str.split(cutChar);
        var floatArray = [];
        for (var i = 0; i < strsub.length; i++) {
            floatArray.push(lottery_Utils.getInstance().getFloat(strsub[i]));
        }
        return floatArray;
    }
    getString(title) {
        return this.texArray[this.title[title]];
    }

    static Create = function (title, tex) {
        var line = new CsvTableLine();
        while (tex.includes(" ")) {
            tex = tex.replace(" ", "");
        }
        line.init(title, tex);
        return line;
    }
}