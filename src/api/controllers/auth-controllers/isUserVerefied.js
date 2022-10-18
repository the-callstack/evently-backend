'use strict'

const { AppError } = require("../errorControllers")
const { verifyAccessToken } = require("./VerifyToken")




const isUserVerefied = (req, res, next) => {
    try {
        const token = req.body.accessToken
        const isVerefied = verifyAccessToken(token)
        if (isVerefied) {
            req.user = isVerefied
            next()
        } else {
            throw new Error('Not Authorized')
        }
    } catch (e) {
        next(new AppError(401, e.message))
    }
}


module.exports = {
    isUserVerefied
}