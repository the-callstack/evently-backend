'use strict';

const { storeCollection } = require('../../../models');
const { AppError } = require('../../controllers/errorControllers');

const createStore = async (req, res, next) => {
  try {
    const newStore = req.body;
    // newStore.logoPath = req.file.path;
    // newStore.logoName = req.file.filename;
    const createdStore = await storeCollection.create(newStore);
    res.status(201).json(createdStore);
  } catch (e) {
    next(new AppError(401, 'Cannot Create Store'));
  }
};

const getStores = async (req, res, next) => {
  try {
    const storesData = await storeCollection.readAllRecords();
    res.status(200).json(storesData);
  } catch (error) {
    next(new AppError(500, error.message));
  }
};


const getStoreDetalis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const storeDetails = await storeCollection.populateById({ id });
    res.status(200).json(storeDetails);
  } catch (error) {
    next(new AppError(500, error.message));
  }
};


const getByVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stores = await storeCollection.readAllRecordsWithCondition({ UserId: id });
    if (stores) {
      res.status(200).send(stores);
    } else {
      res.status(200).send('There is No stores for this vendor:(');
    }
  } catch (error) {
    next(new AppError(500, error.message));
  }
}

const deleteStore = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteStore = await storeCollection.destroy(id);
    res.status(204).json(deleteStore);
  } catch (e) {
    next(new AppError(401, 'Cannot Delete Store'));
  }
};

const updateStore = async (req, res, next) => {
  try {
    const newStore = req.body;
    const { id } = req.params;
    // newStore.logoPath = req.file.path;
    // newStore.logoName = req.file.filename;
    const updatedStore = await storeCollection.update(id, newStore);
    res.status(201).json(updatedStore);
  } catch (e) {
    next(new AppError(401, 'Cannot Update Store'));
  }
};



module.exports = {
  createStore,
  updateStore,
  deleteStore,
  getStores,
  getStoreDetalis,
  getByVendor
};
