"use strict";

const { express } = require("../../../config");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");
const { aggregatePackage } = require("./package.handlers");

const packageRouter = express.Router();

packageRouter.post("/package", isUserVerefied, aggregatePackage);

module.exports = {
  packageRouter,
};
