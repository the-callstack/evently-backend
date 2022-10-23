'use strict'

const { express } = require("../../../config")
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized")
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied")
const { getEvents, getEventDetalis, createEvent, updateEvent, deleteEvent } = require("./testhandlers")

const testeventRouter = express.Router()

testeventRouter.get('/testevent', getEvents)
testeventRouter.get('/testevent/:id', getEventDetalis)
testeventRouter.post('/testevent', createEvent)
testeventRouter.put('/testevent/:id', updateEvent)
testeventRouter.delete('/testevent/:id', deleteEvent)

module.exports = {
    testeventRouter
}