import _ from "lodash";

import { Patterns, Utils, Exceptions } from "../../dist/";

const { VivaReal } = Patterns;
const { Context } = Utils;
const { ValidationFail } = Exceptions;

function getData() {
  const { body } = require("./file.json");
  body.attrs = _.fromPairs(body.attributes.map((row, i) => [row.name, row]));
  return body;
}

describe("Testes", () => {
  //
  test("Should fails on validate", async function () {
    //
    const data = getData();

    delete data.attrs.bath;

    const validate = () => VivaReal.validate(data, new Context());

    expect(validate).toThrow(ValidationFail);
  });

  test("Should pass on validate", async function () {
    //
    const data = getData();

    const validate = () => VivaReal.validate(data, new Context());

    expect(validate).not.toThrow();
  });

  test("Should map data", async function () {
    //
    const data = getData();

    const xmldata = VivaReal.map(data, new Context({ returnData: true }));

    expect(true).toBe(true);
  });
  // ---------------------------------------------------------------------------
});
