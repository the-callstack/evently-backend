"use strict";

const { saleItemCollection } = require("../../../models");


const getOneSaleItems = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await saleItemCollection.populateById(id);
        res.status(200).send(item);
    } catch (e) {
        next(new AppError(401, 'cannot read Items'))
    }
}

const getAllSaleItems = async (req, res, next) => {
    try {
        const allItem = await saleItemCollection.readAllRecords();
        res.status(200).send(allItem);
    } catch (e) {
        next(new AppError(401, 'cannot read Items'))
    }
}


const createSaleItem = async (req, res, next) => {
    const itemData = req.body;
    itemData.imgPath = req.file.path
    itemData.imgNAme = req.file.filename
    try {
        const newItem = await saleItemCollection.create(itemData);
        res.status(201).send(newItem);
    } catch (e) {
        next(new AppError(401, 'cannot create new Item'))
    }
};


const updateSaleItem = async (req, res, next) => {
    const newData = req.body;
    const { id } = req.params;
    try {
        const newItem = await saleItemCollection.update(id, newData);
        res.status(202).send(newItem);
    } catch (e) {
        next(new AppError(401, 'cannot update this Item'))
    }
}


const deleteSaleItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        await saleItemCollection.destroy(id);
        res.status(204).send('the item deleted successfully');
    } catch (e) {
        next(new AppError(401, 'cannot delete this Item'))
    }
}


module.exports = {
    getOneSaleItems,
    getAllSaleItems,
    deleteSaleItem,
    updateSaleItem,
    createSaleItem
}
