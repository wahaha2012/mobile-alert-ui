/*!
 * Mobile Alert UI
 * Author: wxwdesign@gmail.com
 * Licensed under the MIT License.
 * https://github.com/wahaha2012/mobile-alert-ui
 */
(function(root, factory) {
    factory = typeof factory === 'function' ? factory : function() {}
    if (typeof define === 'function') {
        if (define.amd) {
            define([], factory);
        } else if (define.cmd) {
            define(function(require, exports, module) {
                module.exports = factory();
            });
        }
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof DP === 'object' && typeof DP.define === 'function') {
        DP.define([], factory);
    } else {
        root.AlertUI = root.AlertUI || factory();
    }
}(this, '{{{factory}}}'));