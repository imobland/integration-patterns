(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.ValidationFail = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  // class ValidationFail extends Error {
  //   constructor(key, params) {
  //     super.constructor(key);
  //     this.key = key;
  //     this.params = params;
  //   }
  //   getMessage() {
  //     return "[validation] " + this.key;
  //   }
  // }
  class ValidationFail extends Error {
    constructor(key, ...params) {
      super(key);
      this.type = "ValidationFail";
      this.key = key;
      this.params = params;
    }

    getMessage() {
      return "[validation] " + this.message;
    }

  }

  var _default = ValidationFail;
  _exports.default = _default;
});