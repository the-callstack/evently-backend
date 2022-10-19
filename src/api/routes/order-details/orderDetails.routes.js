'use strict'

const { express } = require("../../../config")
const { addOrderDetails, createFilledOrder } = require("./orderDetails.handlers")




const orderDetailsRouter = express.Router()


orderDetailsRouter.post('/details', createFilledOrder)

module.exports = {
    orderDetailsRouter
}