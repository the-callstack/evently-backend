'use strict'

const { express } = require("../../../config")
const { getter } = require("./user.handlers")


const userRouter = express.Router()



//TODO:
// add validators babsed on role, only admin can access these rotues 
userRouter.get('/', getter)

module.exports = {
    userRouter
}