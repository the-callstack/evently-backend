'use strict'; 

const {jwt} = require('../../../../config/utils');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../../../../config/index');

const verifyToken = (token) => {
    let payload = jwt.verify(token, ACCESS_TOKEN_SECRET || REFRESH_TOKEN_SECRET); // to be discussed
    return payload;
}
 


module.exports = {
    verifyToken
}