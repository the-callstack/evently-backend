"use strict";

const { express } = require("../../../config");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const { createOrder, updateOrder, deleteOrder } = require("./order.handlers");

const orderRouter = express.Router();

orderRouter.post("/create", isAuthorized, createOrder);
orderRouter.put("/update", isAuthorized, updateOrder);
orderRouter.delete("/delete", isAuthorized, deleteOrder);

module.exports = {
  orderRouter,
};
