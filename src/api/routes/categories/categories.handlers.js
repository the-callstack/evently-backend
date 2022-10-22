'use strict';

const { eventCollection, categoryCollection } = require("../../../models");
const { extractCategories } = require("../../controllers/bussiness-logic/categoriesOperations");
const AppError = require("../../controllers/errorControllers/error-class");


const createCatWithEvent = async (req, res, next) => {
    try {
        const data = req.body;
        const { events } = data;
        const createdCategory = await categoryCollection.createWithNested(data, ['events']);
        const result = {
            events,
            createdCategory
        };
        res.status(200).send(result);

    } catch (error) {
        next(new AppError(500, error.message));
    }
};



const createEventAndAddCategories = async (req, res, next) => {
    try {
        const data = req.body;
        const newEvent = await eventCollection.create(data);
        const { newCategories, existingCategories } = extractCategories(data);
        const createdCategories = await categoryCollection.createInBulk(newCategories);
        const toBeAddedCategories = await categoryCollection.readAllRecordsWithCondition(existingCategories);
        const completeEvent = await newEvent.addCategories([...createdCategories, ...toBeAddedCategories]);
        const results = {
            newCategories,
            existingCategories,
            createdCategories,
            toBeAddedCategories,
            completeEvent
        };
        res.status(200).send(results);
    } catch (error) {
        next(new AppError(500, error.message));
    }
};




const findAll = async (req, res, next) => {
    const data = await categoryCollection.readAllPopulated();
    res.status(200).send(data);
};
const updateExistingCatEvents = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const { events } = data;
        const data1 = { id };
        const foundCategory = await categoryCollection.populateById(data1);
        const data2 = events;
        const foundEvents = await eventCollection.readAllRecordsWithCondition(data2);
        const addedEvents = await foundCategory.addEvents(foundEvents);
        const result = {
            events,
            foundCategory,
            foundEvents,
            addedEvents
        };
        res.status(200).send(result);
    } catch (error) {
        next(new AppError(500, error.message));
    }
};


module.exports = {
    createCatWithEvent,
    updateExistingCatEvents,
    findAll,
    createEventAndAddCategories
};