'use strict';

const { eventCollection, categoryCollection } = require("../../../models");
const AppError = require("../../controllers/errorControllers/error-class");


const createEventWithCat = async (req, res, next) => {
    try {
        const data = req.body;
        const { categories } = data;
        const createdEvent = await eventCollection.createWithNested(data, ['categories']);
        const result = {
            categories,
            createdEvent
        };
        res.status(200).send(result);

    } catch (error) {
        next(new AppError(500, error.message));
    }

};


const updateEventCat = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const { categories } = data;
        const data1 = { id };
        const foundEvent = await eventCollection.populateById(data1);
        const data2 = categories;
        const cats = await categoryCollection.readAllRecordsWithCondition(data2);
        const addedCat = await foundEvent.addCategories(cats);
        const result = {
            categories,
            foundEvent,
            cats,
            addedCat
        };
        res.status(200).send(result);
    } catch (error) {
        next(new AppError(500, error.message));
    }
};


module.exports = {
    createEventWithCat,
    updateEventCat
};