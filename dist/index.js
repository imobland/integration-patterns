(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./patterns/vivareal", "./utils/context"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./patterns/vivareal"), require("./utils/context"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vivareal, global.context);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _vivareal, _context) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Utils = _exports.Patterns = void 0;
  _vivareal = _interopRequireDefault(_vivareal);
  _context = _interopRequireDefault(_context);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // import OLX from "./patterns/olx";
  const Patterns = {
    VivaReal: _vivareal.default // OLX,

  }; // -----------------------------------------------------------------------------

  _exports.Patterns = Patterns;
  const Utils = {
    Context: _context.default
  }; // -----------------------------------------------------------------------------

  _exports.Utils = Utils;
});