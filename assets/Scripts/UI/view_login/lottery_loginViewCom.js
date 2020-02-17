cc.Class({
    extends: require("lottery_viewBaseComponent"),
    properties: {
    },
    /*------------------子类重写函数---------------*/
    OnInit() {
        this.moduleName = "loginPre";
        this.loginJs = cc.find('lotteryLoginIn', this.node).getComponent('lottery_Login');
        this.lotteryTypeJs = cc.find('lotteryTypeSelect', this.node).getComponent('lottery_TypeSelect');
    },
    OnShow() {
        this.lotteryTypeJs.hide();
     },
    OnHide() { },
    OnDispose() { },
    _onMessageHandel(data) {
        switch (data.type) {
            case 1:
                this.lotteryTypeJs.show(data.data);
                break;
            case 2:
                break;
        }
    }
});