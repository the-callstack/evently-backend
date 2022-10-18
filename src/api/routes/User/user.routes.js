'use strict';

const { express } = require('../../../config');
const { upload } = require('../../../config/cloudinary');
const { isUserExist } = require('../../controllers/auth-controllers/checkExistingUser');
const { checkUserCreds } = require('../../controllers/auth-controllers/checkUserCreds');
const { signup, signin, signout } = require('./userController');


const authRouter = express.Router();



authRouter.post('/signup', isUserExist, signup)
authRouter.post('/signin', checkUserCreds, signin)
authRouter.delete('/signout', signout)



module.exports = authRouter
