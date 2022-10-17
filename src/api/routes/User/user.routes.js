'use strict';

const { express } = require('../../../config');
const { getter, singIn, signUp, singOut } = require('./user.handlers');

const userRouter = express.Router();

userRouter.post(
  '/signin',
  decodeHeaders,
  isEmailExist,
  comparePassword,
  generateAccessToken,
  validateToken,
  singIn
);
userRouter.post(
  '/signup',
  isEmailExist,
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
  signUp
);
userRouter.post('/signout', singOut);

//TODO:
// add validators babsed on role, only admin can access these rotues
userRouter.get('/', getter);

module.exports = {
  userRouter,
};
