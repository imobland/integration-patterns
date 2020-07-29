(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "lodash", "./constants", "./helpers"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("lodash"), require("./constants"), require("./helpers"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lodash, global.constants, global.helpers);
    global.validation = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _lodash, _constants, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  _lodash = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _default(resource, context) {
    //
    if (!_lodash.default.has(resource, "reference")) {
      context.fail("reference must be defined");
    }

    if (!_lodash.default.has(resource, "type.id")) {
      context.fail("invalid-type", "type must be defined");
    }

    let type = (0, _helpers.getType)(resource.type.id);

    if (!type) {
      context.log("unknown-type", "this pattern does not recognize the type of property");
      return true;
    } // BATH REQUIRED -------------------------------------------------------------


    const bath_required = ["Residential / Apartment", "Residential / Home", "Residential / Condo", "Residential / Farm Ranch", "Residential / Penthouse", "Residential / Flat", "Residential / Kitnet", "Residential / Sobrado", "Commercial / Consultorio", "Commercial / Edificio Residencial", "Commercial / Agricultural", "Commercial / Building", "Commercial / Loja", "Commercial / Office"];

    if (bath_required.includes(type)) {
      // context.log("BATH REQUIRED into type: " + type);
      if (!_lodash.default.has(resource, "attrs.bath")) {
        context.fail("required-attr:bath");
        return false;
      }
    } // BED REQUIRED -------------------------------------------------------------


    const bed_required = ["Residential / Apartment", "Residential / Home", "Residential / Condo", "Residential / Farm Ranch", "Residential / Penthouse", "Residential / Flat", "Residential / Kitnet", "Residential / Sobrado", "Commercial / Agricultural"];

    if (bed_required.includes(type)) {
      // context.log("BED REQUIRED into type: " + type);
      if (!_lodash.default.has(resource, "attrs.bed")) {
        context.fail("required-attr:bed");
        return false;
      }
    }

    return true;
  }
});