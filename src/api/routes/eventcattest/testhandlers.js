'use strict';

const { eventCollection, testCollection, categoryCollection, eventCatCollection } = require('../../../models');
const { extractCatgories, creatcat } = require('../../controllers/bussiness-logic/categoriesOperations');
const { AppError } = require('../../controllers/errorControllers');

const createEvent = async (req, res, next) => {
    try {
        const data = req.body;
        const newEvent = { "eventType": data.eventType };
        const createdEvent = await testCollection.create(newEvent);
        const results = {}
        if (data.categories) {
            results.toBeAddedCategories = await categoryCollection.readAllRecordsWithCondition(data.categories);
            results.completeEvent = await createdEvent.addCategories(results.toBeAddedCategories);
        }

        res.status(200).send(results);
    } catch (e) {

        next(new AppError(401, e.message));
    }
};

const getEvents = async (req, res, next) => {
    try {
        const eventsData = await testCollection.readAllPopulated()
        res.status(200).json(eventsData)
    } catch (e) {
        next(new AppError(500, e.message))
    }
}


const getEventDetalis = async (req, res, next) => {
    try {
        const { id } = req.params
        const eventDetails = await testCollection.populateById({ id })
        res.status(200).json(eventDetails)
    } catch (error) {
        next(new AppError(500, 'Server Error'))
    }
}


const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteEvent = await testCollection.destroy(id);
        res.status(204).json(deleteEvent);
    } catch (e) {
        next(new AppError(401, e.message));
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const newCat = req.body.EventsCategory.new;
        const deleteCatID = req.body.EventsCategory.cancelled;
        const { id } = req.params;
        const foundEvent = await testCollection.populateById({ id })
        const addCategories = creatcat(foundEvent, newCat);
        if (deleteCatID) await eventCatCollection.destroyEventCat(id, deleteCatID.id)
        const result = {
            foundEvent,
            newCat,
            deleteCatID,
            addCategories
        }
        res.status(201).json(result);
    } catch (e) {
        next(new AppError(401, e.message));
    }
};



module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventDetalis
};



