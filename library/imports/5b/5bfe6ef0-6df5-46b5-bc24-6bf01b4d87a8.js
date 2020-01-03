"use strict";
cc._RF.push(module, '5bfe67wbfVGtbwka/AbTYeo', 'TouchManager');
// Scripts/Core/Tools/TouchManager.js

'use strict';

/*
触摸管理，用于控制多点触控问题
*/
var openSingleTouch = false;
(function () {
    if (!openSingleTouch) return;
    cc.Node.maxTouchCount = 1;
    cc.Node.touchCount = 0;
    var _dispatchEvent = cc.Node.prototype.dispatchEvent;
    cc.Node.prototype.dispatchEvent = function (event) {
        switch (event.type) {
            case 'touchstart':
                if (cc.Node.touchCount < cc.Node.maxTouchCount) {
                    cc.Node.touchCount++;
                    this.canTouch = true;
                    _dispatchEvent.call(this, event);
                }
                break;
            case 'touchmove':
                if (!this.canTouch && cc.Node.touchCount < cc.Node.maxTouchCount) {
                    this.canTouch = true;
                    cc.Node.touchCount++;
                }
                if (this.canTouch) {
                    _dispatchEvent.call(this, event);
                }
                break;
            case 'touchend':
                if (this.canTouch) {
                    this.canTouch = false;
                    cc.Node.touchCount--;
                    cc.Node.touchCount = cc.Node.touchCount < 0 ? 0 : cc.Node.touchCount;
                    _dispatchEvent.call(this, event);
                }
                break;
            case 'touchcancel':
                if (this.canTouch) {
                    this.canTouch = false;
                    cc.Node.touchCount--;
                    cc.Node.touchCount = cc.Node.touchCount < 0 ? 0 : cc.Node.touchCount;
                    _dispatchEvent.call(this, event);
                }
                break;
            default:
                _dispatchEvent.call(this, event);
                break;
        }
    };
    // var onPostActivated = cc.Node.prototype._onPostActivated;

    var _onPreDestroy = cc.Node.prototype._onPreDestroy;
    cc.Node.prototype._onPreDestroy = function () {
        if (this.canTouch) {
            this.canTouch = false;
            cc.Node.touchCount--;
            cc.Node.touchCount = cc.Node.touchCount < 0 ? 0 : cc.Node.touchCount;
        }
        _onPreDestroy.call(this);
    };
})();

cc._RF.pop();