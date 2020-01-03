/**
 * 浏览器存在内存限制 32位为1.0GB,64位为1.4GB,
 * 播放当前视频的时候,至少得把下一阶段的视频加载完毕。//->已更换播放方式
 */
import SingletonBase from "../Singleton/SingletonBase";

export default class lottery_animDataMgr extends SingletonBase {
    resDir = {};
    resUrl = 'Altas/little/';
    static _onNewObject() {
        let one = new lottery_animDataMgr();
        return one;
    }
    //数据目录初始化
    init(progressCallBack, callback) {
        cc.loader.loadResDir(this.resUrl, cc.SpriteFrame, progressCallBack, (err, objects, urls) => {
            if (err) {
                console.log('错误', err);
                return;
            }
            for (let index = 0, length = urls.length; index < length; index++) {
                let one = urls[index].split('/');
                let name = one[one.length - 2];
                !this.resDir[name] && (this.resDir[name] = []);
                this.resDir[name].push(objects[index]);
            }
            callback && callback();
            console.log(this.resUrl, '加载完毕');
        });
    }
    /*------------------------------------------对某个目录的处理------------------------------- */
    //加载某个阶段的视频
    loadResDir(urlName, progressCallBack, callback) {
        // if (this.resDir[urlName] && this.resDir[urlName].length) return;

    }
    //释放某个阶段的视频
    releaseResDir(url) {
        cc.loader.releaseResDir(this.resUrl + url);
        this.resDir[url].length = 0;
    }

}