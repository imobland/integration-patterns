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
    global.config = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: "VivaReal",
    keyword: "vivareal",
    description: "",
    link: {
      description: ""
    },
    rules: {
      description: "",
      fields: {
        rooms: {
          label: "Quartos",
          description: "Requerido para casa, sobrado, apartamento"
        },
        bath: {
          label: "Banheiro",
          description: "Requerido para casa, sobrado, apartamento, e loja comercial"
        }
      }
    }
  };
  _exports.default = _default;
});