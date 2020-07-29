(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./patterns/vivareal", "./utils/context", "./exceptions/ValidationFail"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./patterns/vivareal"), require("./utils/context"), require("./exceptions/ValidationFail"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vivareal, global.context, global.ValidationFail);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _vivareal, _context, _ValidationFail) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Exceptions = _exports.Utils = _exports.Patterns = void 0;
  _vivareal = _interopRequireDefault(_vivareal);
  _context = _interopRequireDefault(_context);
  _ValidationFail = _interopRequireDefault(_ValidationFail);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  const Patterns = {
    VivaReal: _vivareal.default
  };
  _exports.Patterns = Patterns;
  const Exceptions = {
    ValidationFail: _ValidationFail.default
  };
  _exports.Exceptions = Exceptions;
  const Utils = {
    Context: _context.default
  };
  _exports.Utils = Utils;
});