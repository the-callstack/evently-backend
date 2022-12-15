'use strict';

const { express, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../../../config');
const { upload } = require('../../../config/cloudinary');
const { jwt } = require('../../../config/utils');
const { userModel } = require('../../../models');
const { isUserExist } = require('../../controllers/auth-controllers/checkExistingUser');
const { checkUserCreds } = require('../../controllers/auth-controllers/checkUserCreds');
const { generateRefreshToken } = require('../../controllers/auth-controllers/TokenGenerator');
const { AppError } = require('../../controllers/errorControllers');
const { signup, signin, signout } = require('./userController');


const authRouter = express.Router();
function validateRefreshToken(req, res, next) {
    if (!req.headers.cookie) {
        next('Not Authorized')
    }
    try {
        const refreshToken = req.cookies.refresh_token
        const verified = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
        req.verified = verified
        next()
    } catch (e) {
        next(e)
    }
}

async function refreshSignIn(req, res, next) {
    try {
        const { userId } = req.verified
        const user = await userModel.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
        })
        const refresh_token = generateRefreshToken({
            userId: user.id
        })
        console.log(refresh_token);
        const token = jwt.sign({
            username: user.username,
            userId: user.id,
            userRoles: user.roles
        }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' })

        user.access_token = token
        return res.status(201)
            .cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 2 * 60 * 60 * 1000
            })
            .json(user);

    } catch (e) {
        next(new AppError(300, e.message))
    }
}


authRouter.post('/silent', validateRefreshToken, refreshSignIn)
authRouter.post('/signup', isUserExist, signup)
authRouter.post('/signin', checkUserCreds, signin)
authRouter.delete('/signout', signout)



module.exports = authRouter
