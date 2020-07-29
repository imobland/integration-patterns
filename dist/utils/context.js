(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../exceptions/ValidationFail"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../exceptions/ValidationFail"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ValidationFail);
    global.context = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _ValidationFail) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _ValidationFail = _interopRequireDefault(_ValidationFail);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  class Context {
    constructor(data) {
      this.data = data;
    }

    log(x) {
      console.log(x);
    }

    fail(x) {
      throw new _ValidationFail.default(x, []);
    }

  }

  _exports.default = Context;
});