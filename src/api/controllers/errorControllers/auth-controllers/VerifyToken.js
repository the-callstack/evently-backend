'use strict'; 

const {jwt} = require('../../../../config/utils');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../../../../config/index');

const verifyAccessToken = (token) => {
    let payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return payload;
}
const verifyRefreshToken = (token) => {
    let payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return payload;
}
 


module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}