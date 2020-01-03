"use strict";
cc._RF.push(module, '23138QenuxKYLVcYADpQWXk', 'lottery_loginViewCom');
// Scripts/UI/view_login/lottery_loginViewCom.js

"use strict";

cc.Class({
    extends: require("lottery_viewBaseComponent"),
    properties: {},
    /*------------------子类重写函数---------------*/
    OnInit: function OnInit() {
        this.moduleName = "loginPre";
        this.loginJs = cc.find('lotteryLoginIn', this.node).getComponent('lottery_Login');
        this.lotteryTypeJs = cc.find('lotteryTypeSelect', this.node).getComponent('lottery_TypeSelect');
    },
    OnShow: function OnShow() {},
    OnHide: function OnHide() {},
    OnDispose: function OnDispose() {},
    _onMessageHandel: function _onMessageHandel(data) {
        switch (data.type) {
            case 1:
                this.lotteryTypeJs.show(data.data);
                break;
            case 2:
                break;
        }
    }
});

cc._RF.pop();