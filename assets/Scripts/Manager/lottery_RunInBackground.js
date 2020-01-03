import SingletonBase from "SingletonBase";

/*
后台切入切出相关  切到后台 回调参数 false 切入 true
*/
let runCallback = {}

class RunInBackground extends SingletonBase {
    
    constructor() {
        super();
    }

    static _onNewObject() {
        let _instance = new RunInBackground();
        cc.game.on(cc.game.EVENT_HIDE, _instance._goToBackground, _instance);
        cc.game.on(cc.game.EVENT_SHOW, _instance._goToFront, _instance);
        return _instance
    }
    _onDestroyObject() {
        cc.game.off(cc.game.EVENT_HIDE, this._goToBackground, this)
        cc.game.off(cc.game.EVENT_SHOW, this._goToFront, this)
    }
    _goToBackground() {
        this.CallRunCallback(false);
    }
    _goToFront() {
        this.CallRunCallback(true);
    }
    CallRunCallback(focus) {
        for (const key in runCallback) {
            const element = runCallback[key];
            element(focus)
        }
    }
    /*--------------------------------对外接口-----------------------*/
    RegestRunInBackground(tag, callback, self) {
        runCallback[tag] = self ? callback.bind(self) : callback
    }
    UnregestRunInBackground(tag) {
        if (runCallback[tag])
            delete runCallback[tag]
    }
}

module.exports = RunInBackground