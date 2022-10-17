'use strict';

const {bcrypt} = require('../../../../config/utils')

const hashPassword = async (password) =>{
    return await bcrypt.hash(password,12);
}

module.exports = {
  hashPassword,
};