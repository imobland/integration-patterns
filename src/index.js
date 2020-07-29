import VivaReal from "./patterns/vivareal";
// import OLX from "./patterns/olx";

const Patterns = {
  VivaReal,
  // OLX,
};

// -----------------------------------------------------------------------------

import Context from "./utils/context";
import ValidationFail from "./exceptions/ValidationFail";

const Exceptions = {
  ValidationFail,
};

const Utils = {
  Context,
};

// -----------------------------------------------------------------------------

export { Patterns, Utils, Exceptions };
