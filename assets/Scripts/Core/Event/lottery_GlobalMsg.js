import SingletonBase from "../../Singleton/SingletonBase";

/**
 * 消息处理中心
 * 当前是同步机制
 */
export default class GlobalMsg extends SingletonBase {

    m_Callbacks = {}

    constructor() {
        super();
    }

    static _onNewObject() {
        return new GlobalMsg()
    }

    _onDestroyObject() {
        this.m_Callbacks = {}
    }
    /**注册单个监听 */
    Register(msgkey, callback, uuid) {
        try {
            if (this.m_Callbacks[msgkey] == null) {
                this.m_Callbacks[msgkey] = []
            }
            this.m_Callbacks[msgkey].push({
                "callback": callback,
                "uuid": uuid
            })    //数组，同一个脚本，可能注册多次
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    /**注销监听
     * 如果传入UUID 则注销单个监听 如果uuid为空 则注销 整个 msgkey的监听
    */
    Unregister(msgkey, uuid) {
        try {
            if (this.m_Callbacks[msgkey] == null) {
                cc.log("Unregister " + msgkey + " failed! case it is null!")
                return
            }
            if (uuid) {
                for (let index = 0; index < this.m_Callbacks[msgkey].length; index++) {
                    const element = this.m_Callbacks[msgkey][index];
                    if (element.uuid == uuid) {
                        this.m_Callbacks[msgkey].splice(index, 1);
                        break;
                    }
                }
            }
            else {
                delete this.m_Callbacks[msgkey];
            }
        } catch (error) {
            cc.log(cc.js.getClassName(this) + ":" + error.message);
        }
    }
    /**
     * 发送消息，msgkey 消息key值
     * args 需要传递的参数 自定义数据结构
     */
    Send(msgkey, args) {
        if (this.m_Callbacks[msgkey] == null) {
            cc.log("this.m_Callbacks[msgkey] == null:" + msgkey + "---------------------------------")
            return
        }
        for (let index = 0; index < this.m_Callbacks[msgkey].length; index++) {
            const element = this.m_Callbacks[msgkey][index];
            if (element.callback) {
                element.callback(args);
            }
        }
    }
}