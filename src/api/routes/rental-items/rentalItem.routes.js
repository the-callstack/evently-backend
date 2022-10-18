'use strict'

const { express } = require("../../../config")
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized")
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied")
const { getAllRentalItems, getRentalItemDetails, createRentalItem, updateRentalItem, deleteRentalItem } = require("./rentalItem-controller")



const rentalItemRouter = express.Router()



rentalItemRouter.get('/rental/:id', isUserVerefied, getRentalItemDetails)
rentalItemRouter.post('/rental', isUserVerefied, createRentalItem)
rentalItemRouter.put('/rental/:id', isUserVerefied, isAuthorized, updateRentalItem)
rentalItemRouter.delete('/rental/:id', isUserVerefied, isAuthorized, deleteRentalItem)


module.exports = {
    rentalItemRouter
}