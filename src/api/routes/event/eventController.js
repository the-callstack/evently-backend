





'use strict';

const { eventCollection } = require('../../../models');
const { AppError } = require('../../controllers/errorControllers');

const createEvent = async (req, res, next) => {
    try {
        const newEvent = req.body;
        // newEvent.eventImgPath = req.file.path;
        // newEvent.eventImgName = req.file.filename;
        const createdEvent = await eventCollection.create(newEvent);
        res.status(201).json(createdEvent);
    } catch (e) {
        next(new AppError(401, 'Cannot Create event'));
    }
};

const getEvents = async (req, res, next) => {
    try {
        const eventsData = await eventCollection.readAllRecords()
        res.status(200).json(eventsData)
    } catch (error) {
        next(new AppError(500, 'Server Error'))
    }
}


const getEventDetalis = async (req, res, next) => {
    try {
        const { id } = req.params
        const eventDetails = await eventCollection.populateById(id)
        res.status(200).json(eventDetails)
    } catch (error) {
        next(new AppError(500, 'Server Error'))
    }
}


const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteEvent = await eventCollection.destroy(id);
        res.status(204).json(deleteEvent);
    } catch (e) {
        next(new AppError(401, 'Cannot Delete event'));
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const newEvent = req.body;
        const { id } = req.params;
        // newEvent.eventImgPath = req.file.path;
        // newEvent.eventImgName = req.file.filename;
        const updatedEvent = await eventCollection.update(id, newEvent);
        res.status(201).json(updatedEvent);
    } catch (e) {
        next(new AppError(401, 'Cannot Update event'));
    }
};

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventDetalis
};











