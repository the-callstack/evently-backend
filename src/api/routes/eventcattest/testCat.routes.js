'use strict'

const { express } = require("../../../config")
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized")
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied")
const { getCategory, getCategoryDetalis, updateCategory, deleteCategory, createCat } = require("./testCathandler")

const testCatRouter = express.Router()

testCatRouter.get('/testcat', isUserVerefied, isAuthorized, getCategory)
testCatRouter.get('/testcat/:id', isUserVerefied, isAuthorized, getCategoryDetalis)
testCatRouter.post('/testcat', createCat)
testCatRouter.put('/testcat/:id', isUserVerefied, isAuthorized, updateCategory)
testCatRouter.delete('/testcat/:id', isUserVerefied, isAuthorized, deleteCategory)


module.exports = {
    testCatRouter
}