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
    global.constants = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.propertyStatus = _exports.features = _exports.types = void 0;
  // 
  const propertyStatus = {
    1: "Under Construction",
    2: "Built",
    3: "Renovation",
    4: "Built",
    5: "Built"
  };
  _exports.propertyStatus = propertyStatus;
  const types = {
    1: "Residential / Home",
    2: "Residential / Sobrado",
    3: "Residential / Kitnet",
    4: "Residential / Home",
    5: "Residential / Apartment",
    6: "Residential / Farm Ranch",
    7: "Residential / Farm Ranch",
    8: "Residential / Land Lot",
    9: "Commercial / Building",
    10: "Residential / Apartment",
    11: "Commercial / Loja",
    12: "Commercial / Industrial",
    13: "Residential / Home",
    14: "Residential / Home",
    15: "Residential / Home",
    16: "Residential / Apartment",
    17: "Farm Ranch",
    18: "Building",
    19: "Business",
    20: "Residential / Land Lot",
    21: "Commercial / Loja",
    22: "Farm Ranch",
    23: "Business",
    24: "Residential / Home",
    25: "Residential / Home",
    26: "Residential / Land Lot",
    27: "Residential / Home",
    28: "Residential / Apartment",
    29: "Business"
  };
  _exports.types = types;
  const features = {
    "alarm-system": "Alarm System",
    balcony: "Balcony",
    barbecue: "BBQ",
    "close-to-main-roads": "Close to main roads/avenues",
    "close-to-shopping": "Close to shopping centers",
    "air-conditioner": "Cooling",
    elevator: "Elevators",
    fireplace: "Fireplace",
    furnished: "Furnished",
    garden: "Garden Area ",
    "gourmet-area": "Gourmet Area",
    "green-space": "Green space / Park",
    gym: "Gym",
    intercom: "Intercom",
    playground: "Playground",
    "sport-court": "Sports Court",
    "in-condominium": "Condo",
    pool: "Swimming Pool",
    "party-hall": "Party hall",
    veranda: "Veranda",
    "24-hour-security": "24 hours security",
    "...": "Fenced Yard",
    "...": "Number of stories",
    "...": "Reflective Pool"
  };
  _exports.features = features;
});