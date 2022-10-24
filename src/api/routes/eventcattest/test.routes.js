'use strict'

const { express } = require("../../../config")
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized")
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied")
const { getEvents, getEventDetalis, createEvent, updateEvent, deleteEvent } = require("./testhandlers")

const testeventRouter = express.Router()

testeventRouter.get('/testevent', isUserVerefied, isAuthorized, getEvents)
testeventRouter.get('/testevent/:id', isUserVerefied, isAuthorized, getEventDetalis)
testeventRouter.post('/testevent', isUserVerefied, createEvent)
testeventRouter.put('/testevent/:id', isUserVerefied, isAuthorized, updateEvent)
testeventRouter.delete('/testevent/:id', isUserVerefied, isAuthorized, deleteEvent)

module.exports = {
    testeventRouter
}