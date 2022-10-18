'use strict'

const { AppError } = require("../errorControllers")



const isAuthorized = async (req, res, next) => {
    try {
        const { userRoles } = req.user
        const loggedInUserId = req.user.userId
        const ownerId = req.body.UserId
        if (ownerId === loggedInUserId || userRoles == 'admin') {
            next()
        } else {
            throw new Error('Not Authorized')
        }
    } catch (e) {
        next(new AppError(401, e.message))
    }
}

module.exports = {
    isAuthorized
}