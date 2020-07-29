(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "xmlbuilder", "./helpers", "moment"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("xmlbuilder"), require("./helpers"), require("moment"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.xmlbuilder, global.helpers, global.moment);
    global.wrapper = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _xmlbuilder, _helpers, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  _xmlbuilder = _interopRequireDefault(_xmlbuilder);
  _moment = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _default(data, rows) {
    const {
      map
    } = (0, _helpers.getMapper)(data);
    let xml = {
      ListingDataFeed: {
        "@xmlns": "http://www.vivareal.com/schemas/1.0/VRSync",
        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "@xsi:schemaLocation": "http://www.vivareal.com/schemas/1.0/VRSync http://xml.vivareal.com/vrsync.xsd",
        //
        Heading: map([{
          key: "Provider",
          default: data.name
        }, {
          key: "ContactName",
          default: data.name
        }, {
          key: "Email",
          default: data.email
        }, {
          key: "PublishDate",
          default: (0, _moment.default)().format()
        }]),
        Listings: {
          "#text": "[slot]"
        }
      }
    };
    xml = String(_xmlbuilder.default.create(xml).end());
    return xml.replace("[slot]", rows);
  }
});