'use strict';

const cors = require('cors');
const morgan = require('morgan');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const omit = require('lodash/omit');


module.exports = {
  morgan,
  cors,
  base64,
  bcrypt,
  cookieParser,
  jwt,
  helmet,
  omit
};
