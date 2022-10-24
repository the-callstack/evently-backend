'use strict';

const { express } = require("../../../config");
const { aggregatePackage } = require("./package.handlers");




const packageRouter = express.Router();


packageRouter.post('/package', aggregatePackage);



module.exports = {
    packageRouter
};