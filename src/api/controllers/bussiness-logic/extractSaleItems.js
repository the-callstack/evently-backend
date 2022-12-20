'use strict'

const { saleItemCollection } = require("../../../models")


const extractSaleItem = (data) => {
    return data.details.reduce((val, item) => {
        if (item.SaleItemId) {
            val.push({
                quantity: item.quantity,
                id: item.SaleItemId,
            })
        }
        return val
    }, [])
}



const updateSaleItemQuantity = async (saleItems) => {
    const updatedItems = []
    try {
        for (let item of saleItems) {
            const data = {
                quantity: -item.quantity
            }
            const updatedSaleItemQuantity = await saleItemCollection.incrementValue(item.id, data)
            updatedItems.push(updatedSaleItemQuantity[0][0][0])
        }
        return updatedItems
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = {
    extractSaleItem,
    updateSaleItemQuantity
}