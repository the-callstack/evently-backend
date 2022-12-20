'use strict';

const { orderDetailsCollection, orderCollection } = require("../../../models");
const { calculateTotalPrice } = require("../../controllers/bussiness-logic/calculateTotalPrice");
const { updateSaleItemQuantity, extractSaleItem } = require("../../controllers/bussiness-logic/extractSaleItems");
const { extractRentalItem, createTrackersInBulk, updateRentalTrackerQuantity } = require("../../controllers/bussiness-logic/fillRentalTracker");
const { AppError } = require("../../controllers/errorControllers");





const addOrderDetails = async (req, res, next) => {
    try {
        const data = req.body;
        const createdDetails = await orderDetailsCollection.createInBulk(data);
        res.status(200).json(createdDetails);
    } catch (e) {
        next(new AppError(500, e.message));
    }
};

const createFilledOrder = async (req, res, next) => {
    try {
        const data = req.body;


        data.totalPrice = calculateTotalPrice(data.details);
        
        const { newTrackers, existingTrackers } = extractRentalItem(data);
        const saleItems = extractSaleItem(data);
        const updatedSaleItems = await updateSaleItemQuantity(saleItems);
        const createdTrackers = await createTrackersInBulk(newTrackers);
        const updatedTrackers = await updateRentalTrackerQuantity(existingTrackers);
        const createdOrder = await orderCollection.createWithNested(data, ['details']);
        const result = {
            // saleItems,
            // createdTrackers,
            // updatedSaleItems,
            // updatedTrackers,
            createdOrder
        };
        res.status(200).send(createdOrder);
    } catch (e) {
        next(new AppError(500, e.message));
    }
};

module.exports = {
    addOrderDetails,
    createFilledOrder
};