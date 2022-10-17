'use strict'
const { generateAccessToken, generateRefreshToken, hashPassword } = require('/TokenGenerator')
const userCollection = require('./errorControllers/index')

const signin = async (req, res) => {
    try {
        const user = req.body
        const token = generateAccessToken(user)
        const refresh_token = generateRefreshToken(user)

        user.access_token = token
        return res.status(200)
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


const signup = async (req, res) => {
    hashPassword
    try {
        const newUser = req.body;
        newUser.password = hashPassword(req.body.password)


        const createdUser = await userCollection.create(newUser)
        const addedUser = omit(createdUser.dataValues, ['password'])
        const token = generateAccessToken(newUser)
        const refresh_token = generateRefreshToken(newUser)

        addedUser.access_token = token
        await createdUser.update({ refresh_token })
        return res.status(201)
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

const signout = async (req, res) => {
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

module.export = {
    signin,
    signout,
    signout
}