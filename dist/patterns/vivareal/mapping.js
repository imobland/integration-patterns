(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "xmlbuilder", "lodash", "moment", "./helpers"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("xmlbuilder"), require("lodash"), require("moment"), require("./helpers"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.xmlbuilder, global.lodash, global.moment, global.helpers);
    global.mapping = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _xmlbuilder, _lodash, _moment, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  _xmlbuilder = _interopRequireDefault(_xmlbuilder);
  _lodash = _interopRequireDefault(_lodash);
  _moment = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _default(property, context) {
    //
    const {
      map
    } = (0, _helpers.getMapper)(property);
    const PriceTag = property.operation_id == "sale" ? "ListPrice" : "RentalPrice";
    const PricePeriod = property.operation_id == "rent" ? "Montly" : "Daily"; // ---------------------------------------------------------------------------
    // LOCATION

    const Location = map([{
      key: "Country",
      default: {
        "@abbreviation": "BR",
        "#text": "Brasil"
      }
    }, {
      key: "State",
      from: "location.state",
      handle: ({
        acronym,
        name
      }) => ({
        "@abbreviation": _lodash.default.toUpper(acronym),
        "#text": _lodash.default.trim(name)
      })
    }, {
      key: "City",
      from: "location.city.name",
      handle: value => _lodash.default.trim(value)
    }, {
      key: "Neighborhood",
      from: "location.district.name",
      handle: value => _lodash.default.trim(value)
    }, {
      key: "Zone",
      from: "location.zone"
    }, {
      key: "Address",
      from: "location.street",
      handle: value => ({
        "@publiclyVisible": true,
        "#text": _lodash.default.trim(value)
      })
    }, {
      key: "PostalCode",
      from: "location.postalcode"
    }, {
      key: "Latitude",
      from: "location.position.lat"
    }, {
      key: "Longitude",
      from: "location.position.lon"
    }]); // ---------------------------------------------------------------------------
    // DETAILS

    const Details = map([{
      key: "Description",
      from: "description",
      handle: value => ({
        "#cdata": value
      })
    }, {
      key: PriceTag,
      from: "price",
      handle: value => ({
        "@currency": "BRL",
        "#text": value,
        ...(0, _helpers.getIf)(PriceTag == "RentalPrice", () => ({
          "@period": PricePeriod
        }))
      })
    }, {
      key: "Bedrooms",
      from: "attrs.bed.value"
    }, {
      key: "Bathrooms",
      from: "attrs.bath.value"
    }, {
      key: "Garage",
      from: "attrs.garage.value"
    }, {
      key: "Suites",
      from: "attrs.suite.value"
    }, {
      key: "YearBuilt",
      from: "attrs.year-build.value"
    }, {
      key: "DevelopmentLevel",
      from: "attrs.property-status.value",
      handle: value => (0, _helpers.getPropertyStatus)(value)
    }, {
      key: "PropertyAdministrationFee",
      from: "attrs.condominium-price.value",
      handle: value => ({
        "@currency": "BRL",
        "#text": value
      })
    }, {
      key: "YearlyTax",
      from: "attrs.property-tax.value",
      handle: value => ({
        "@currency": "BRL",
        "#text": value
      })
    }, {
      key: "LotArea",
      from: "attrs.total-area.value",
      handle: value => ({
        "@unit": "square metres",
        "#text": value
      })
    }, {
      key: "ConstructedArea",
      from: "attrs.constructed-area.value",
      handle: value => ({
        "@unit": "square metres",
        "#text": value
      })
    }, {
      key: "LivingArea",
      from: "attrs.util-area.value",
      handle: value => ({
        "@unit": "square metres",
        "#text": value
      })
    }, {
      key: "UnitNumber",
      from: "location.number"
    }, {
      key: "Features.Feature",
      from: "attrs",
      handle: attrs => (0, _helpers.getFeatures)(attrs)
    }, {
      key: "Location",
      handle: () => {
        return Location;
      }
    }]); // -------------------------------------------------------------------

    const data = {
      Listing: map([//
      {
        key: "ListingID",
        from: "reference",
        handle: value => ({
          "@id": property.id,
          "#text": value
        })
      }, {
        key: "Title",
        from: "title"
      }, {
        key: "TransactionType",
        from: "operation_id"
      }, {
        key: "LastUpdateDate",
        from: "updatedt_at"
      }, {
        key: "DetailViewUrl",
        from: "url"
      }, {
        key: "PropertyType",
        from: "type",
        handle: ({
          id
        }) => (0, _helpers.getType)(id)
      }, {
        key: "ListDate",
        default: (0, _moment.default)(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }, {
        key: "Media.Item",
        from: "pictures",
        handle: rows => rows.map(pic => ({
          "@medium": "image",
          "#text": pic.fullpath,
          ...(0, _helpers.getIf)(parseInt(pic.display) === 1, () => ({
            "@primary": true
          }))
        }))
      }, {
        key: "Details",
        default: Details
      }])
    };

    if (context.data.returnData) {
      return data;
    }

    return String(_xmlbuilder.default.create(data).end());
  }
});