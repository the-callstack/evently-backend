"use strict";

const { saleItemCollection } = require("../../../models");
const { AppError } = require("../../controllers/errorControllers");


const getOneSaleItems = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await saleItemCollection.populateById(id);
        res.status(200).send(item);
    } catch (e) {
        next(new AppError(401, 'cannot read Items'));
    }
};

const getAllSaleItems = async (req, res, next) => {
    try {
        const allItem = await saleItemCollection.readAllPopulated();
        res.status(200).send(allItem);
    } catch (e) {
        next(new AppError(401, 'cannot read Items'));
    }
};


const createSaleItem = async (req, res, next) => {
    const itemData = req.body;
    console.log(req.file)
    // itemData.imgPath = req.file.path
    // itemData.imgName = req.file.filename
    try {
        const newItem = await saleItemCollection.create(itemData);
        res.status(201).send(newItem);
    } catch (e) {
        next(new AppError(401, e.message));
    }
};


const updateSaleItem = async (req, res, next) => {
    const newData = req.body;
    const { id } = req.params;
    try {
        const newItem = await saleItemCollection.update(id, newData);
        res.status(202).send(newItem);
    } catch (e) {
        next(new AppError(401, e.message));
    }
};


const deleteSaleItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        await saleItemCollection.destroy(id);
        res.status(204).send('the item deleted successfully');
    } catch (e) {
        next(new AppError(401, e.message));
    }
};
const getByStore = async (req, res, next) => {
    try {
      const { id } = req.query ;
      const rentalItems = await saleItemCollection.populateById({StoreId: id});
      if(rentalItems){
        res.status(200).json(rentalItems);
      }else {
        res.status(200).send('There is No Items available in this Category :(');
      }
    } catch (error) {
      next(new AppError(500, error.message));
    }
  }
  const getByCategory = async (req, res, next) => {
    try {
      const { category } = req.query ;
      const rentalItems = await saleItemCollection.readAllRecordsWithCondition({CategoryId: category});
      if(rentalItems){
        res.status(200).json(rentalItems);
      }else {
        res.status(200).send('There is No Items available in this Category :(');
      }
    } catch (error) {
      next(new AppError(500, error.message));
    }
  }

  const getByPrice = async (req, res, next) => {
    try {
      const { price } = req.params ;
      const num = parseInt(price);
      console.log(typeof num);
      const rentalItems = await saleItemCollection.readAllRecordsBetween(num);
      res.status(200).send(rentalItems);
    } catch (error) {
      next(new AppError(500, error.message));
    }
  }


module.exports = {
    getOneSaleItems,
    getAllSaleItems,
    deleteSaleItem,
    updateSaleItem,
    createSaleItem,
    getByStore,
    getByCategory,
    getByPrice
};
