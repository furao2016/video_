import SingletonBase from '../../Singleton/SingletonBase';
import lottery_BaseResLoad from '../../Core/ResHandle/lottery_BaseResLoad'
/**
 * 项目的辅助脚本，理应只提供辅助类的函数
 */
export default class Helper extends SingletonBase {
    tipsLayer;
    loadingLayer;
    static _onNewObject() {
        let _instance = new Helper();
        _instance.Res = {};
        _instance.TipsLayer = null; // 缓存tipslayer
        return _instance;
    }
    /**
     *  浮动提示
     * @param content
     */
    showTips(content, type = 1) {
        // content = cc.lottery.LanguageManager.GetLanguageText(content);
        if (this.tipsLayer) {
            this.tipsLayer.showTips(content, type);
        } else {
            this.addPrefabToNode("Prefab/tipsLayer", cc.find("Canvas"), 1000, (node) => {
                this.tipsLayer = node.getComponent("lottery_tipsLayer");
                this.tipsLayer.showTips(content, type);
            });
        }
    }
    /**
     * 显示加载动画
     * @param {*} isClose 
     */
    showLoading(isPlay = true) {
        if (!isPlay) {
            this.loadingLayer && this.loadingLayer.stopPlay();
        }
        else if (this.loadingLayer)
            this.loadingLayer.startPlay();
        else {
            this.addPrefabToNode("Prefab/loadingLayer", cc.find("Canvas"), 1000, (node) => {
                this.loadingLayer = node.getComponent('lottery_loadingTip');
                this.loadingLayer.startPlay();
            })
        }
    }
    /**
    * 挂在预制资源到指定节点
    * @param prefabUrl
    * @param targetNode  挂在到的节点
    * @param zIndex      层级
    * @param completeCallBack  成功回掉
    */
    addPrefabToNode(prefabUrl, targetNode = cc.director.getScene(), zIndex = 0, completeCallBack) {

        let resFun = function (err, prefab) {
            if (err) {
                cc.lottery.AppLogMgr.log("addPrefabToNode func load " + prefabUrl + " err");
                return;
            }

            let node = cc.instantiate(prefab);
            targetNode.addChild(node, zIndex);
            if (completeCallBack) {
                completeCallBack(node);
            }
        };

        lottery_BaseResLoad.getInstance().LoadByKey(prefabUrl, prefabUrl, resFun);
    }
}