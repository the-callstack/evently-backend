'use strict';

const { eventCollection, categoryCollection, eventCatCollection } = require('../../../models');
const { extractCategories, creatcat, creatEvent } = require('../../controllers/bussiness-logic/categoriesOperations');
const { AppError } = require('../../controllers/errorControllers');

const createCat = async (req, res, next) => {
    try {
        const data = req.body;
        const newCategory = { "name": data.name };
        const createdCategory = await categoryCollection.create(newCategory);
        const results = {}
        if (data.events) {
            results.toBeAddedEvents = await eventCollection.readAllRecordsWithCondition(data.events);
            results.completeCategory = await createdCategory.addEvents(results.toBeAddedEvents);
        }

        res.status(200).send(results);
    } catch (e) {

        next(new AppError(401, e.message));
    }
};

const getCategory = async (req, res, next) => {
    try {
        const categoriesData = await categoryCollection.readAllPopulated()
        res.status(200).json(categoriesData)
    } catch (e) {
        next(new AppError(500, e.message))
    }
}


const getCategoryDetalis = async (req, res, next) => {
    try {
        const { id } = req.params
        const categoryDetails = await categoryCollection.populateById({ id })
        res.status(200).json(categoryDetails)
    } catch (error) {
        next(new AppError(500, 'Server Error'))
    }
}


const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteCategoory = await categoryCollection.destroy(id);
        res.status(204).json(deleteCategoory);
    } catch (e) {
        next(new AppError(401, e.message));
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const newEvent = req.body.EventsCategory.new;
        const deleteCEventID = req.body.EventsCategory.cancelled;
        const { id } = req.params;
        const foundCategory = await categoryCollection.populateById({ id })
        const addEvent = creatEvent(foundCategory, newEvent);
        if (deleteCEventID) await eventCatCollection.destroyEventCat(deleteCEventID.id, id)

        const result = {
            foundCategory,
            newEvent,
            deleteCEventID,
            addEvent
        }
        res.status(201).json(result);
    } catch (e) {
        next(new AppError(401, e.message));
    }
};



module.exports = {
    createCat,
    updateCategory,
    deleteCategory,
    getCategory,
    getCategoryDetalis
};



