'use strict';

const { express } = require("../../../config");
const { createEventWithCat, updateEventCat } = require("./events.handlers");



const eventsCatRouter = express.Router();



eventsCatRouter.post('/event', createEventWithCat);
eventsCatRouter.put('/event/:id', updateEventCat);



module.exports = {
    eventsCatRouter
};