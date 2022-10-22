'use strict';

const { express } = require("../../../config");
const { createCatWithEvent, updateExistingCatEvents, findAll, createEventAndAddCategories } = require("./categories.handlers");


const catRouter = express.Router();




catRouter.post('/cat', createCatWithEvent);
catRouter.put('/cat/:id', updateExistingCatEvents);
catRouter.get('/cat', findAll);
catRouter.patch('/cat', createEventAndAddCategories);


module.exports = {
    catRouter
};