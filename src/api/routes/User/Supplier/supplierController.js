"use strict";

const { supplierCollection } = require("../../../../models");
const AppError = require("../../../controllers/errorControllers/error-class");


const getAll = async ( req, res, next ) => {
  try {

    const allStores = await supplierCollection.readAllRecords();
    res.status(200).send(allStores);
  
  } catch (e) {
  
    next( new AppError(500, e.message));
  
  }
}

const createStore = async (req, res, next) => {
  const storeData = req.body;

  try {
    const store = await supplierCollection.create(storeData);
    res.status(201).send(store);

  } catch (e) {

    next(new AppError(500, e.message));

  }
};

const deleteStore = async (req, res, next) => {
  const { id } = req.params;

  try {
    await supplierCollection.destroy(id);
    res.status(204).send('Store has been deleted successfully');
  } catch (e) {
    next(new AppError(500, e.message));
  }
}

const updateStore = async ( req, res, next ) => {
  const newData = req.body;
  const { id } = req.params;
  try {
    const newStore = await supplierCollection.update(id,newData);
    res.status(202).send(newStore);
  } catch (e) {
    next(new AppError(500, e.message));
  }
}

module.exports = {
  createStore,
  deleteStore,
  getAll,
  updateStore
}


