'use strict'

const { AppError } = require("../errorControllers")
const { isEmailOrPhoneUnique } = require("./isEmailExist")



const isUserExist = async (req, res, next) => {
    try {
        const { email, phone } = req.body
        const emailExist = await isEmailOrPhoneUnique(email, phone)
        if (emailExist) {
            next()
        } else {
            throw new Error('Email or Phone Already Used')
        }
    } catch (e) {
        next(new AppError(401, e.message))
    }
}

module.exports = {
    isUserExist
}
