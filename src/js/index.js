(function (root, factory) {
  factory = typeof factory === 'function' ? factory : function(){}
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else if (DP && DP.define){
    DP.define([], factory);
  } else {
    root.AlertUI = root.AlertUI || factory();
  }
}(this, '{{{factory}}}');