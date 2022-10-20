'use strict'


const calculateTotalPrice = (payload) => {
    let total = 0
    for (let item of payload) {
        const itemTotalPrice = item.price * item.quantity
        total += itemTotalPrice
    }

    return total
}


module.exports = {
    calculateTotalPrice
}