// class ValidationFail extends Error {
//   constructor(key, params) {
//     super.constructor(key);

//     this.key = key;
//     this.params = params;
//   }
//   getMessage() {
//     return "[validation] " + this.key;
//   }
// }

class ValidationFail extends Error {
  constructor(key, ...params) {
    super(key);
    this.type = "ValidationFail";
    this.key = key;
    this.params = params;
  }
  getMessage() {
    return "[validation] " + this.message;
  }
}

export default ValidationFail;
