"use strict";

const { orderCollection } = require("../../../models");
const { AppError } = require("../../controllers/errorControllers");

const createOrder = async (req, res, next) => {
  try {
    const newOrder = req.body;
    const createdOrder = await orderCollection.create(newOrder);
    res.status(201).json(createdOrder);
  } catch (e) {
    next(new AppError(401, "Cannot Create Order"));
  }
};

const deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedOrder = await orderCollection.destroy(id);
    res.status(204).json(deletedOrder);
  } catch (e) {
    next(new AppError(401, "Cannot Delete Order"));
  }
};

const updateOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedOrder = await orderCollection.update(id);
    res.status(200).json(updatedOrder);
  } catch (e) {
    next(new AppError(401, "Cannot Delete Order"));
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderCollection.readAllRecords()
    res.status(200).json(orders)
  } catch (error) {
    next(new AppError(500, 'Server Error'))
  }
}

const getOrderDetails = async (req, res, next) => {
  try {
    let filter = req.query.filter
    if (typeof (filter) === 'string') {
      filter = [filter]
    }
    const { id } = req.params
    const order = await orderCollection.populateById(id, filter)
    res.status(200).json(order)
  } catch (error) {
    next(new AppError(500, 'Server Error'))
  }
}

module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrders,
  getOrderDetails
};
