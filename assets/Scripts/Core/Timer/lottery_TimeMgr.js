import SingletonBase from "../../Singleton/SingletonBase";

/*
计时器管理类
*/
export default class TimerManager extends SingletonBase {

    timerList = []
    timerID = 0
    isOpenTimer = false
    timerIndex = false
    activeTimerIDDic = {}
    intervalID = 0
    intervalTime = 0

    constructor() {
        super();
    }
    
    static _onNewObject() {
        let instance = new TimerManager();
        instance.intervalTime = 1 / cc.game.config.frameRate
        instance.intervalID = setInterval(instance.updateTimer.bind(instance), instance.intervalTime * 1000)
        return instance
    }
    _onDestroyObject() {
        clearInterval(this.intervalID)
        this.clearTimer()
    }
    updateTimer() {
        if (!this.isOpenTimer)
            return;
        this.timerIndex = this.timerList.length - 1;
        for (; this.timerIndex >= 0; this.timerIndex--) {
            var timerobj = this.timerList[this.timerIndex];
            if (timerobj.isPause)
                continue
            timerobj.timer += this.intervalTime;
            if (timerobj.timer >= timerobj.delay) {
                timerobj.callback();
                timerobj.repeat--;
                if (!timerobj.isEndless && timerobj.repeat <= 0) {
                    this.timerList.splice(this.timerIndex, 1)
                    if (this.timerList.length <= 0) {
                        this.isOpenTimer = false;
                    }
                }
                else {
                    timerobj.timer = timerobj.timer - timerobj.interval;
                }
            }
        }
    }
    /*
    获取计时器ID，内部调用 计算方式有待优化
    */
    getTimerID() {
        this.timerID = this.timerID + 1;
        if (this.timerID >= 999999999)
            this.timerID = 1;
        while (this.activeTimerIDDic[this.timerID]) {
            this.timerID = this.timerID + 1;
            if (this.timerID >= 999999999)
                this.timerID = 1;
        }
        return this.timerID;
    }
    /*
    打开一个计时器
    callback 回调函数
    interval 间隔时间
    repeat 重复次数 <=0 无限次数 >0 重复repeat次
    delay 延时时间
    self 注册对象

    return 计时器的ID
    */
    openTimer(callback, interval, repeat, delay, self) {
        var timer = {
            "id": this.getTimerID(),
            "callback": callback.bind(self),
            "interval": interval,
            "repeat": repeat,
            "curRepeat": repeat,
            "delay": delay,
            "isEndless": repeat > 0 ? false : true,
            "timer": 0,
            "isPause": false
        };
        if (repeat <= 0) {
            this.activeTimerIDDic[timer.id] = true
        }
        this.timerList.push(timer);
        if (!this.isOpenTimer)
            this.isOpenTimer = true;
        return timer.id;
    }
    /*
    关闭一个计时器
    */
    closeTimer(id) {
        this.timerIndex = this.timerList.length - 1;
        for (; this.timerIndex >= 0; this.timerIndex--) {
            var timerobj = this.timerList[this.timerIndex]
            if (timerobj.id === id) {
                this.timerList.splice(this.timerIndex, 1);
                break;
            }
        }
        if (this.activeTimerIDDic[id]) {
            delete this.activeTimerIDDic[id]
        }
    }
    /*
    暂停一个计时器
    */
    pauseTimer(id) {
        this.timerIndex = this.timerList.length - 1;
        for (; this.timerIndex >= 0; this.timerIndex--) {
            var timerobj = this.timerList[this.timerIndex]
            if (timerobj.id === id) {
                timerobj.isPause = true;
            }
        }
    }
    /*
    恢复一个计时器
    */
    resumeTimer(id) {
        this.timerIndex = this.timerList.length - 1;
        for (; this.timerIndex >= 0; this.timerIndex--) {
            var timerobj = this.timerList[this.timerIndex]
            if (timerobj.id === id) {
                timerobj.isPause = false;
            }
        }
    }
    /*
    重置一个计时器主要是把计时增量置0，重新开始计时，有次数限制的 重置次数，达到复用的目的
    重置计时器的各项数据  不传入的为之前的默认值
    */
    resetTImer(id, delay, repeat, interval) {
        this.timerIndex = this.timerList.length - 1;
        for (; this.timerIndex >= 0; this.timerIndex--) {
            var timerobj = this.timerList[this.timerIndex]
            if (timerobj.id === id) {
                timerobj.repeat = repeat ? repeat : timerobj.curRepeat;
                timerobj.timer = 0;
                timerobj.delay = delay ? delay : timerobj.delay;
                timerobj.interval = interval ? interval : timerobj.interval;
            }
        }
    }
    clearTimer() {
        this.isOpenTimer = false;
        this.timerList = [];
    }
}