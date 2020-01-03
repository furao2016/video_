(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/UI/view_login/lottery_loginViewCom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '23138QenuxKYLVcYADpQWXk', 'lottery_loginViewCom', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=lottery_loginViewCom.js.map
        