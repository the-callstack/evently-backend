"use strict";

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../../../../config/index");

const { jwt } = require("../../../../config/utils");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "2h" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
