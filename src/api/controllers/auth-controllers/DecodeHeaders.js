"use strict";

const { base64 } = require("../../../config/utils");

const decodeHeaders = (basicAuth) => {
  const encoded = basicAuth.split(" ").pop();
  const decoded = base64.decode(encoded).split(":");
  return decoded;
};

module.exports = {
  decodeHeaders,
};
