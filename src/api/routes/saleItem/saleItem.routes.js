'use strict';

const { express } = require('../../../config');
const {getOneSaleItems, getAllSaleItems, createSaleItem,  updateSaleItem ,deleteSaleItem} = require('./saleItemController');
const { isAuthorized } = require('../../controllers/auth-controllers/isAuthorized');
const { upload } = require('../../../config/cloudinary');


const saleItemRouter = express.Router();


saleItemRouter.get('/getoneSaleItems',isAuthorized, getOneSaleItems)
saleItemRouter.get('/getSaleItems',isAuthorized, getAllSaleItems)
saleItemRouter.post('/createSaleItem',upload.single('img'),isAuthorized, createSaleItem)
saleItemRouter.put('/updateSaleItem',upload.single('img'),isAuthorized, updateSaleItem)
saleItemRouter.delete('/deleteSaleItem',isAuthorized, deleteSaleItem)



module.exports = saleItemRouter
