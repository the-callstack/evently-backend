'use strict'

const { express } = require("../../../config")
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized")
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied")
const { getCategory, getCategoryDetalis, updateCategory, deleteCategory, createCat } = require("./testCathandler")

const testCatRouter = express.Router()

testCatRouter.get('/testcat', getCategory)
testCatRouter.get('/testcat/:id', getCategoryDetalis)
testCatRouter.post('/testcat', createCat)
testCatRouter.put('/testcat/:id', updateCategory)
testCatRouter.delete('/testcat/:id', deleteCategory)

module.exports = {
    testCatRouter
}