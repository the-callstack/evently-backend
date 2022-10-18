'use strict'

const { userCollection } = require("../../../models")
const { hashPassword } = require("../../controllers/auth-controllers/HashPassword")
const { generateAccessToken, generateRefreshToken } = require("../../controllers/auth-controllers/TokenGenerator")
const { AppError } = require("../../controllers/errorControllers")
const { omit } = require('./../../../config/utils')




const signin = async (req, res, next) => {
    try {
        const user = req.body
        const payload = {
            userId: user.id,
            userRole: user.role
        }
        const token = generateAccessToken(payload)
        const refresh_token = generateRefreshToken(payload)
        user.accessToken = token
        res.status(200)
            .cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 2 * 60 * 60 * 1000
            })
            .json(user)
    } catch (e) {
        next(new AppError(401, 'Username or Password are incorrect'))
    }
}


const signup = async (req, res, next) => {
    try {
        const newUser = req.body;
        newUser.avatarPath = req.file.path
        newUser.avatarName = req.file.filename
        newUser.password = await hashPassword(req.body.password)
        const createdUser = await userCollection.create(newUser)
        const addedUser = omit(createdUser.dataValues, ['password'])
        const payload = {
            userId: addedUser.id,
            userRole: addedUser.role
        }
        const token = generateAccessToken(payload)
        const refresh_token = generateRefreshToken(payload)

        addedUser.accesstoken = token
        res.status(201)
            .cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 2 * 60 * 60 * 1000
            })
            .json(addedUser);

    } catch (e) {
        next(new AppError(401, 'Cannot signup'))
    }
}

const signout = async (req, res, next) => {
    try {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 2 * 60 * 60 * 1000
        }).sendStatus(204)
    } catch (e) {
        next(new AppError(401, 'Cannot signout'))
    }
}

module.exports = {
    signin,
    signup,
    signout
}