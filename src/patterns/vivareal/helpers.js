import _ from "lodash";
import iscallable from "is-callable";
import { features, types, propertyStatus } from "./constants";

/**
 * GET PICTURES
 * Obtém os valores dos atributos do recurso
 * caso o valor não exista, ele não retornará
 * nenhum valor
 */
export function getAttribute(property) {
  return (label, path, value = null) => {
    if (!_.has(property, path)) {
      return;
    }
    let _value = value ? value : _.get(property, path);
    if (iscallable(value)) {
      return { [label]: value(_.get(property, path)) };
    }
    if (value === null) {
      return { [label]: _.get(property, path) };
    }
    return { [label]: value };
  };
}

// GET TYPE
export function getType(type_id) {
  if (types.hasOwnProperty(type_id)) {
    return types[type_id];
  }
}

// GET BELONG TYPES
export function getBelongTypes(type) {
  const rows = [];
  for (const i in types) {
    if (types[i] == type) {
      rows.push(i);
    }
  }
  return rows;
}

export function getPropertyStatus(id) {
  if (propertyStatus.hasOwnProperty(id)) {
    return propertyStatus[id];
  }
  return propertyStatus[0];
}

// GET PRICE
export function getPrice(property) {
  if (!property.operation_id) return;
  const key = property.operation_id == "sale" ? "ListPrice" : "RentalPrice";
  const price = {
    "#text": property.price,
    "@currency": "BRL",
  };
  if (property.operation_id != "sale") {
    price["@period"] = property.operation_id == "rent" ? "Montly" : "Daily";
  }
  return { [key]: price };
}

// GET PRICE
export function getFeatures(attrs) {
  let list = [];
  for (let i in attrs) {
    if (attrs[i].type != "bool") continue;
    if (features[attrs[i].name]) {
      list.push(features[attrs[i].name]);
    }
  }
  return list;
}

export function getIf(condition, cb) {
  return condition ? cb() : null;
}

export function getMapper(property) {
  return {
    map: (actions) => {
      let data = {};

      for (let i in actions) {
        let row = actions[i];
        let { key, handle, from } = row;
        let value;
        if (row.hasOwnProperty("from")) {
          value = _.get(property, from);
        }
        if (iscallable(handle) && value) {
          value = handle(value);
        }
        if (value == null && !row.hasOwnProperty("default")) {
          continue;
        }
        _.set(data, key, value ? value : row.default);
      }

      return data;
    },
  };
}
