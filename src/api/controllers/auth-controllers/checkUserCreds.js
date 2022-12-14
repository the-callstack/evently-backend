'use strict'

const { AppError } = require("../errorControllers")
const { comparePassword } = require("./comparePassword")
const { decodeHeaders } = require("./DecodeHeaders")
const { isEmailExist } = require("./isEmailExist")
const { omit } = require('./../../../config/utils')


const checkUserCreds = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const [email, password] = decodeHeaders(authHeader)
        const user = await isEmailExist(email)
        const payload = user.password
        const isAuthenticated = await comparePassword(password, payload)
        if (isAuthenticated) {
            req.body = omit(user.dataValues, ['password'])
            next()
        } else {
            console.log('inside else');
            throw new Error('Email or Password are incorrect');
        }
    } catch (e) {
        console.log('inside catch creds');
        next(new AppError(500,'Email or Password are incorrect'))
    }
}

module.exports = { checkUserCreds }