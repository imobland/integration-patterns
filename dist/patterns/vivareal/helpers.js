(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "lodash", "is-callable", "./constants"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("lodash"), require("is-callable"), require("./constants"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lodash, global.isCallable, global.constants);
    global.helpers = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _lodash, _isCallable, _constants) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getAttribute = getAttribute;
  _exports.getType = getType;
  _exports.getBelongTypes = getBelongTypes;
  _exports.getPropertyStatus = getPropertyStatus;
  _exports.getPrice = getPrice;
  _exports.getFeatures = getFeatures;
  _exports.getIf = getIf;
  _exports.getMapper = getMapper;
  _lodash = _interopRequireDefault(_lodash);
  _isCallable = _interopRequireDefault(_isCallable);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * GET PICTURES
   * Obtém os valores dos atributos do recurso
   * caso o valor não exista, ele não retornará
   * nenhum valor
   */
  function getAttribute(property) {
    return (label, path, value = null) => {
      if (!_lodash.default.has(property, path)) {
        return;
      }

      let _value = value ? value : _lodash.default.get(property, path);

      if ((0, _isCallable.default)(value)) {
        return {
          [label]: value(_lodash.default.get(property, path))
        };
      }

      if (value === null) {
        return {
          [label]: _lodash.default.get(property, path)
        };
      }

      return {
        [label]: value
      };
    };
  } // GET TYPE


  function getType(type_id) {
    if (_constants.types.hasOwnProperty(type_id)) {
      return _constants.types[type_id];
    }
  } // GET BELONG TYPES


  function getBelongTypes(type) {
    const rows = [];

    for (const i in _constants.types) {
      if (_constants.types[i] == type) {
        rows.push(i);
      }
    }

    return rows;
  }

  function getPropertyStatus(id) {
    if (_constants.propertyStatus.hasOwnProperty(id)) {
      return _constants.propertyStatus[id];
    }

    return _constants.propertyStatus[0];
  } // GET PRICE


  function getPrice(property) {
    if (!property.operation_id) return;
    const key = property.operation_id == "sale" ? "ListPrice" : "RentalPrice";
    const price = {
      "#text": property.price,
      "@currency": "BRL"
    };

    if (property.operation_id != "sale") {
      price["@period"] = property.operation_id == "rent" ? "Montly" : "Daily";
    }

    return {
      [key]: price
    };
  } // GET PRICE


  function getFeatures(attrs) {
    let list = [];

    for (let i in attrs) {
      if (attrs[i].type != "bool") continue;

      if (_constants.features[attrs[i].name]) {
        list.push(_constants.features[attrs[i].name]);
      }
    }

    return list;
  }

  function getIf(condition, cb) {
    return condition ? cb() : null;
  }

  function getMapper(property) {
    return {
      map: actions => {
        let data = {};

        for (let i in actions) {
          let row = actions[i];
          let {
            key,
            handle,
            from
          } = row;
          let value;

          if (row.hasOwnProperty("from")) {
            value = _lodash.default.get(property, from);
          }

          if ((0, _isCallable.default)(handle) && value) {
            value = handle(value);
          }

          if (value == null && !row.hasOwnProperty("default")) {
            continue;
          }

          _lodash.default.set(data, key, value ? value : row.default);
        }

        return data;
      }
    };
  }
});