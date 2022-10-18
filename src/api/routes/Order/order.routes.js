"use strict";

const { express } = require("../../../config");
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized");
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied");
const { createOrder, updateOrder, deleteOrder, getOrders, getOrderDetails } = require("./order.handlers");

const orderRouter = express.Router();

orderRouter.post("/order", isUserVerefied, createOrder);
orderRouter.get('/order', getOrders)
orderRouter.get('/order/:id', getOrderDetails)
orderRouter.put("/order/:id", isUserVerefied, isAuthorized, updateOrder);
orderRouter.delete("/order/:id", isUserVerefied, isAuthorized, deleteOrder);

module.exports = {
  orderRouter,
};
