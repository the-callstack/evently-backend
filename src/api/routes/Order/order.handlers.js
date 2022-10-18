"use strict";

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
  const id = req.body.id;
  try {
    const deletedOrder = await orderCollection.destroy(id);
    res.status(204).json({ deletedOrder });
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

module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
};
