'use strict';

const { express } = require('../../../config');
const { checkUserCreds } = require('../../controllers/auth-controllers/checkUserCreds');
// const { getter, singIn, signUp, singOut } = require('./userController');
const { signup, signin, signout } = require('./userController');

const authRouter = express.Router();



authRouter.post('/signup', signup)
authRouter.post('/signin', checkUserCreds, signin)
authRouter.delete('/signout', signout)



module.exports = authRouter
