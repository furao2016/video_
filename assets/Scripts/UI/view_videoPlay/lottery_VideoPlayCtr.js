import ViewCtrBase from "../lottery_viewCtrBase";

export default class lottery_VideoPlayCtr extends ViewCtrBase {
    constructor() {
        super()
        this.Init()
    }

    static _onNewObject() {
        return new lottery_VideoPlayCtr()
    }
    AddEvent() {
    }
    RemoveEvent() {
    }
    _OnMessageHandle(data) {
        let _data = data
        /*
        TODO:处理消息然后返回给OnMessageHandle 往view层发送
        */
        return _data
    }
    OnInit() {
        this.moduleName = "videoPlayPre"
    }
    OnOpen() { }
    OnClose() { }
    OnDestroy() { }
}
