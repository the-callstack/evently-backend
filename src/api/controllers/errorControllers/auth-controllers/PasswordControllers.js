'use strict';
const { bcrypt} = require('../../../../config/utils');
const comparePassword = async(password, payload) => {
    return await bcrypt.compare(password, payload.password);
}

module.exports = {comparePassword};