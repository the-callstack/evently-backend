'use strict'

const { AppError } = require("../errorControllers")



const isAuthorized = async (req, res, next) => {
    try {
        const { userRole } = req.user
        const loggedInUserId = req.user.userId
        const ownerId = parseInt(req.body.UserId)
        if (ownerId === loggedInUserId || userRole == 'admin') {
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