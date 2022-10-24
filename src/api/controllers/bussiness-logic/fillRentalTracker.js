'use strict'

const { rentalTrackerCollection } = require("../../../models")



const createTrackersInBulk = async (data) => {
    return await rentalTrackerCollection.createInBulk(data)
}

const updateRentalTrackerQuantity = async (rentalTrackers) => {
    const updatedTrackers = []
    try {
        for (let item of rentalTrackers) {
            const data = {
                quantity: item.quantity
            }
            const updatedTrackerQuantity = await rentalTrackerCollection.incrementValue(item.id, data)
            updatedTrackers.push(updatedTrackerQuantity[0][0][0])
        }
        return updatedTrackers
    } catch (error) {
        throw new Error(error.message)
    }
}


const extractRentalItem = (data) => {
    return data.details.reduce((val, item) => {
        if (item.RentalItemId && item.trackerId) {
            val.existingTrackers.push({
                quantity: item.quantity,
                RentalItemId: item.RentalItemId,
                date: data.deliveryDate,
                id: item.trackerId
            })
        } else if (item.RentalItemId && !item.trackerId) {
            val.newTrackers.push({
                quantity: item.quantity,
                RentalItemId: item.RentalItemId,
                date: data.deliveryDate
            })
        }
        return val
    }, {
        newTrackers: [],
        existingTrackers: []
    })
}








module.exports = {
    extractRentalItem,
    createTrackersInBulk,
    updateRentalTrackerQuantity
}