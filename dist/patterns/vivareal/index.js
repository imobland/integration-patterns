(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./validation", "./mapping", "./wrapper", "./config"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./validation"), require("./mapping"), require("./wrapper"), require("./config"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.validation, global.mapping, global.wrapper, global.config);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _validation, _mapping, _wrapper, _config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _validation = _interopRequireDefault(_validation);
  _mapping = _interopRequireDefault(_mapping);
  _wrapper = _interopRequireDefault(_wrapper);
  _config = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = {
    validate: _validation.default,
    map: _mapping.default,
    wrapper: _wrapper.default,
    config: _config.default
  };
  _exports.default = _default;
});