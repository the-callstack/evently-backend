"use strict";

const { express } = require("../../../config");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");
const {
  addOrderDetails,
  createFilledOrder,
} = require("./orderDetails.handlers");

const orderDetailsRouter = express.Router();

orderDetailsRouter.post(
  "/details",
  // isUserVerefied,
  // isAuthorized,
  createFilledOrder
);

module.exports = {
  orderDetailsRouter,
};
