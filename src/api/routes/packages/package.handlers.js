'use strict';

const { createPackage } = require("../../controllers/bussiness-logic/aggregator");
const AppError = require('./../../../api/controllers/errorControllers/error-class');



const aggregatePackage = async (req, res, next) => {
    try {
        const { eventId, budget, categories, attendance } = req.body;   
        const packageData = await createPackage(eventId, budget, categories, attendance);
        res.status(200).send(packageData);
    } catch (error) {
        console.log(error);
        next(new AppError(500, error.message));
    }
};

module.exports = {
    aggregatePackage
};