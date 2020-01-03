export default class CoreMgr {
    static singletonList = []

    static RegisterSingleton(singleton) {
        this.singletonList.push(singleton)
    }

    static Destroy() {
        for (let index = 0; index < this.singletonList.length; index++) {
            const element = this.singletonList[index];
            element.destroyInstance()
        }
    }
}