'use strict';

const { eventCollection, testCollection, categoryCollection } = require('../../../models');
const { extractCategories } = require('../../controllers/bussiness-logic/categoriesOperations');
const { AppError } = require('../../controllers/errorControllers');

const createEvent = async (req, res, next) => {
    try {
        const data = req.body;
        const newEvent = { "eventType": data.eventType };
        const createdEvent = await testCollection.create(newEvent);
        console.log(data.categories, "**************************")
        if (data.categories) {
            var existngCat = extractCategories(data).existingCategories
            console.log(existngCat)
            var toBeAddedCategories = await categoryCollection.readAllRecordsWithCondition(existngCat);
            console.log(toBeAddedCategories, "=====================================")
            var completeEvent = await createdEvent.addCategories(toBeAddedCategories);
            console.log(completeEvent)
        }
        const results = {
            createdEvent,
            completeEvent,
            completeEvent
        };
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
        const eventDetails = await testCollection.populateById(id)
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
        const newEvent = req.body;
        const { id } = req.params;
        const event = {
            id,
            ...newEvent
        }

        const updatedEvent = await testCollection.updateInBulk(event, ['EventsCategory']);
        console.log(updatedEvent)
        const result ={
            event,
            updatedEvent
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



