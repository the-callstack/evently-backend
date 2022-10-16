'use strict'

const { userCollection } = require("../../../models")
const { AppError } = require("../../controllers/errorControllers")


const { readAllRecords } = userCollection

const getter = async (req, res, next) => {
    try {
        const data = await readAllRecords(next)
        res.status(200).send(data)
    } catch (e) {
        next(new AppError(500, e.message))
    }
}

module.exports = {
    getter
}