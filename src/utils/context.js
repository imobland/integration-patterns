import ValidationFail from "../exceptions/ValidationFail";

export default class Context {
  constructor(data) {
    this.data = data;
  }

  log(x) {
    console.log(x);
  }

  fail(x) {
    throw new ValidationFail(x, []);
  }
}
