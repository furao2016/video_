(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/ProjectEnum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7e1dbNH9CVL8rHeYjZPqV1c', 'ProjectEnum', __filename);
// Scripts/ProjectEnum.js

"use strict";

module.exports = {
    /**
     * 模块打开的模式
     * None:打开不会关闭其他面板,也不会受到其他面板打开的影响
     * NeedHide:打开面板不会隐藏其他面板,但是会受到其他面板的影响
     * HideOther:打开面板需要隐藏其他面板,关闭时打开被隐藏的面板
     * NeedHideOther:打开面板隐藏其他面板,关闭时不会打开被隐藏的面板
     */
    moduleEnum: cc.Enum({
        None: 0,
        NeedHide: 1,
        HideOther: 2,
        NeedHideOther: 3
    })
};

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
        //# sourceMappingURL=ProjectEnum.js.map
        