'use strict'

const { AppError } = require("../errorControllers")



const isAuthorized = async (req, res, next) => {
    try {
        const { userId, userRoles } = req.user
        const id = req.params.id
        const store = await storeCollection.populateById(id, next)
        if (store.dataValues.UserId === userId || userRoles == 'admin') {
            next()
        } else {
            throw new Error('Not Authorized')
        }
    } catch (e) {
        next(new AppError(401, e.mssage))
    }
}

module.exports = {
    isAuthorized
}