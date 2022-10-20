'use strict';

const {express} = require('../../../config');
const { checkSaleItemCategory } = require('./EventCategoriesHandlers');

const eventCatRouter = express.Router(); 




eventCatRouter.get('/categoryselector',checkSaleItemCategory);





module.exports = {
    eventCatRouter
}
