import CoreMgr from "../Core/lottery_CoreMgr";

let allowNew = false
export default class SingletonBase {

    static _singleInstance = null
    static lottery_CoreMgr = null
    constructor() {
        if (!allowNew)
            throw new Error(`Can't new on singleton!`)
    }

    /**
     * 获取单例实例
     */
    static getInstance() {
        if (!this._singleInstance) {
            allowNew = true
            this._singleInstance = this._onNewObject()
            this._AddToCoreMgr()
            allowNew = false
        }

        return this._singleInstance
    }

    /**
     * 创建实例的静态回调方法。由子类重写，并返回具体类型的对象
     */
    static _onNewObject() {
        throw new Error(`must be implement!`)
    }
    /**
     * 添加对象致CoreMgr管理类中去
     */
    static _AddToCoreMgr() {
        CoreMgr.RegisterSingleton(this)
    }
    static _doDestroyInstance() {
        let ret = false
        if (this._singleInstance) {
            ret = true
            let instance = this._singleInstance
            this._singleInstance = null
            instance._onDestroyObject()
        }
        return ret
    }
    /** 
     * 销毁对象的方法
     */

    static destroyInstance() {
        return this._doDestroyInstance()
    }

    /**
     * 实例方法。当单例对象被销毁时被调用的回调方法
     */
    _onDestroyObject() {
        // here is your code...

        // 需要在结尾调用父类的此方法
        //super._onDestroyObject()
    }
}
