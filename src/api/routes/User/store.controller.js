'use strict';

const { storeCollection } = require('../../../models');
const { AppError } = require('../../controllers/errorControllers');

const createStore = async (req, res, next) => {
  try {
    const newStore = req.body;
    newStore.logoPath = req.file.path;
    newStore.logoName = req.file.filename;
    const createdStore = await storeCollection.create(newStore);
    res.status(201).json(createdStore);
  } catch (e) {
    next(new AppError(401, 'Cannot Create Store'));
  }
};

module.exports = {
  createStore,
};
