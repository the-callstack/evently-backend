'use strict'

const { orderDetailsCollection, orderCollection } = require("../../../models")
const { calculateTotalPrice } = require("../../controllers/bussiness-logic/calculateTotalPrice")
const { extractRentalItem, updateTrackersInBulk } = require("../../controllers/bussiness-logic/fillRentalTracker")
const { AppError } = require("../../controllers/errorControllers")





const addOrderDetails = async (req, res, next) => {
    try {
        const data = req.body
        console.log(data)
        const createdDetails = await orderDetailsCollection.createInBulk(data)
        res.status(200).json(createdDetails)
    } catch (e) {
        next(new AppError(500, e.message))
    }
}

const createFilledOrder = async (req, res, next) => {
    try {
        const data = req.body
        data.totalPrice = calculateTotalPrice(data.details)
        const trackers = extractRentalItem(data)
        if (trackers != false) {
            const updatedTrackers = await updateTrackersInBulk(trackers)
        }
        const createdOrder = await orderCollection.createWithNested(data, ['details'])
        const result = {
            createdOrder
        }
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
        next(new AppError(500, e.message))
    }
}

module.exports = {
    addOrderDetails,
    createFilledOrder
}