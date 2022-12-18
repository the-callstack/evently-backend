"use strict";

const {
  categoryCollection,
  eventCollection,
  eventCatCollection,
} = require("../../../models");
const {
  creatcat,
} = require("../../controllers/bussiness-logic/categoriesOperations");
const { AppError } = require("../../controllers/errorControllers");

const createEvent = async (req, res, next) => {
  try {
    const data = req.body;
    const newEvent = { eventType: data.eventType };
    const createdEvent = await eventCollection.create(newEvent);
    const results = { createdEvent };
    if (data.categories) {
      results.toBeAddedCategories =
        await categoryCollection.readAllRecordsWithCondition(data.categories);
      results.completeEvent = await createdEvent.addCategories(
        results.toBeAddedCategories
      );
    }
    res.status(200).send(results);
  } catch (e) {
    next(new AppError(401, e.message));
  }
};

const getEvents = async (req, res, next) => {
  try {
    const eventsData = await eventCollection.readAllPopulated();
    res.status(200).json(eventsData);
  } catch (e) {
    next(new AppError(500, e.message));
  }
};

const getEventDetalis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventDetails = await eventCollection.populateById({ id });
    res.status(200).json(eventDetails);
  } catch (error) {
    next(new AppError(500, "Server Error"));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
     await eventCollection.destroy(id);
    res.status(200).send(id);
  } catch (e) {
    next(new AppError(401, e.message));
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const newCat = req.body.EventsCategory.new;
    const deleteCatID = req.body.EventsCategory.cancelled;
    const { id } = req.params;
    const foundEvent = await eventCollection.populateById({ id });
    const addCategories = await creatcat(foundEvent, newCat);
    if (deleteCatID) {
      var deleted = await eventCatCollection.destroyEventCat(
        id,
        deleteCatID.id
      );
    }
    const result = {
      foundEvent,
      newCat,
      deleteCatID,
      addCategories,
      deleted,
    };
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
  getEventDetalis,
};
