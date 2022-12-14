"use strict";

const { express } = require("../../../config");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getOrderDetails,
  getAllOrdersForUser,
} = require("./order.handlers");

const orderRouter = express.Router();

orderRouter.post("/order",
//  isUserVerefied,
  createOrder);
orderRouter.get("/order",
//  isUserVerefied,
  // isAuthorized,
   getOrders);
orderRouter.get("/order/:id",
//  isUserVerefied,
  // isAuthorized,
   getOrderDetails);
orderRouter.put("/order/:id",
//  isUserVerefied,
  // isAuthorized,
   updateOrder);
orderRouter.delete("/order/:id",
//  isUserVerefied,
  // isAuthorized,
   deleteOrder);
orderRouter.get("/userorder/:id", getAllOrdersForUser);

module.exports = {
  orderRouter,
};
