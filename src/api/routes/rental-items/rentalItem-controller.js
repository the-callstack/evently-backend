'use strict'

const { rentalItemsCollection } = require("../../../models")
const { AppError } = require("../../controllers/errorControllers")




const createRentalItem = async (req, res, next) => {
    try {
        const newRentalItem = req.body
        newRentalItem.imgPath = req.file.path
        newRentalItem.imgName = req.file.name
        const addedRentalItem = await rentalItemsCollection.create(newRentalItem)
        res.status(201).json(addedRentalItem)

    } catch (e) {
        next(new AppError(500, `Server Error: Item creation failed`))
    }
}


const updateRentalItem = async (req, res, next) => {
    try {
        const updatedRentalItem = req.body
        const updatedItem = await rentalItemsCollection.update(updatedRentalItem)
        res.status(200).json(updatedItem)
    } catch (e) {
        next(new AppError(500, `Server Error: Item updating failed`))
    }
}


const deleteRentalItem = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedItem = await rentalItemsCollection.destroy(id)
        res.status(204)
    } catch (error) {
        next(new AppError(500, `Server Error, Item deletion failed`))
    }
}

const getRentalItemDetails = async (req, res, next) => {
    try {
        const { filter } = req.query
        const { id } = req.params
        const item = await rentalItemsCollection.populateById(id, filter)
        res.status(200).json(item)
    } catch (error) {
        next(new AppError(500, `Server Error, Can't retrieve data`))
    }
}


const getAllRentalItems = async (req, res, next) => {
    try {
        const rentalItems = await rentalItemsCollection.readAllRecords()
        res.status(200).json(rentalItems)
    } catch (error) {
        next(new AppError(500, `Server Error, Can't retrieve data`))
    }
}


module.exports = {
    createRentalItem,
    updateRentalItem,
    deleteRentalItem,
    getRentalItemDetails,
    getAllRentalItems
}