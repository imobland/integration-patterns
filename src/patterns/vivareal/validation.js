import _ from "lodash";
import { features, types, propertyStatus } from "./constants";
import {
  getIf,
  getType,
  getBelongTypes,
  getMapper,
  getFeatures,
  getPropertyStatus,
} from "./helpers";

export default function (resource, context) {
  //
  if (!_.has(resource, "reference")) {
    context.fail("reference must be defined");
  }

  if (!_.has(resource, "type.id")) {
    context.fail("invalid-type", "type must be defined");
  }

  let type = getType(resource.type.id);

  if (!type) {
    context.log(
      "unknown-type",
      "this pattern does not recognize the type of property"
    );
    return true;
  }

  // BATH REQUIRED -------------------------------------------------------------

  const bath_required = [
    "Residential / Apartment",
    "Residential / Home",
    "Residential / Condo",
    "Residential / Farm Ranch",
    "Residential / Penthouse",
    "Residential / Flat",
    "Residential / Kitnet",
    "Residential / Sobrado",
    "Commercial / Consultorio",
    "Commercial / Edificio Residencial",
    "Commercial / Agricultural",
    "Commercial / Building",
    "Commercial / Loja",
    "Commercial / Office",
  ];

  if (bath_required.includes(type)) {
    // context.log("BATH REQUIRED into type: " + type);
    if (!_.has(resource, "attrs.bath")) {
      context.fail("required-attr:bath");
      return false;
    }
  }

  // BED REQUIRED -------------------------------------------------------------

  const bed_required = [
    "Residential / Apartment",
    "Residential / Home",
    "Residential / Condo",
    "Residential / Farm Ranch",
    "Residential / Penthouse",
    "Residential / Flat",
    "Residential / Kitnet",
    "Residential / Sobrado",
    "Commercial / Agricultural",
  ];

  if (bed_required.includes(type)) {
    // context.log("BED REQUIRED into type: " + type);
    if (!_.has(resource, "attrs.bed")) {
      context.fail("required-attr:bed");
      return false;
    }
  }

  return true;
}
