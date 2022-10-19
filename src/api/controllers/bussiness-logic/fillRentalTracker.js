'use strict'

const { rentalTrackerCollection } = require("../../../models")



const updateTrackersInBulk = async (data) => {
    return await rentalTrackerCollection.updateInBulk(data, ['quantity'])
}



const extractRentalItem = (data) => {
    return data.details.reduce((val, item) => {
        if (item.RentalItemId && item.trackerId) {
            val.push({
                quantity: item.itemQuantity,
                RentalItemId: item.RentalItemId,
                date: data.deleveryDate,
                id: item.trackerId
            })
        } else if (item.RentalItemId && !item.trackerId) {
            val.push({
                quantity: item.itemQuantity,
                RentalItemId: item.RentalItemId,
                date: data.deleveryDate
            })
        }
        return val
    }, [])
}








module.exports = {
    extractRentalItem,
    updateTrackersInBulk
}