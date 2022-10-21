'use strict'

const { express } = require("../../../config")
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized")
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied")
const { getEvents, getEventDetalis, createEvent, updateEvent, deleteEvent } = require("./eventController")

const eventRouter = express.Router()

eventRouter.get('/event', getEvents)
eventRouter.get('/event/:id', getEventDetalis)
eventRouter.post('/event',isUserVerefied, createEvent)
eventRouter.put('/event/:id', isUserVerefied, isAuthorized, updateEvent)
eventRouter.delete('/event/:id', isUserVerefied, isAuthorized, deleteEvent)

module.exports = {
    eventRouter
}
