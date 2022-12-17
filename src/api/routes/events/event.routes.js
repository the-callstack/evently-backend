"use strict";

const { express } = require("../../../config");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");
const {
  getEvents,
  getEventDetalis,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("./event.handlers");

const eventRouter = express.Router();

eventRouter.get("/event", 
// isUserVerefied, 
// isAuthorized, 
getEvents);
eventRouter.get("/event/:id", isUserVerefied, isAuthorized, getEventDetalis);
eventRouter.post("/event",
//  isUserVerefied,
  // isAuthorized, 
  createEvent);
eventRouter.put("/event/:id", isUserVerefied, isAuthorized, updateEvent);
eventRouter.delete("/event/:id", isUserVerefied, isAuthorized, deleteEvent);

module.exports = {
  eventRouter,
};
