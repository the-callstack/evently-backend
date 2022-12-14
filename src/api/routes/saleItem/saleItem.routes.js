"use strict";

const { express } = require("../../../config");
const {
  getOneSaleItems,
  getAllSaleItems,
  createSaleItem,
  updateSaleItem,
  deleteSaleItem,
  getByCategory,
  getByStore,
  getByPrice,
  getByKeyWord
} = require("./saleItemController");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const { upload } = require("../../../config/cloudinary");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");

const saleItemRouter = express.Router();

saleItemRouter.get("/sale/:id",
//  isUserVerefied,
 getOneSaleItems);
saleItemRouter.get("/sale",
//  isUserVerefied,
  getAllSaleItems);
saleItemRouter.get("/salecat/:id",
//  isUserVerefied,
getByCategory);

saleItemRouter.get("/salekey?",
//  isUserVerefied,
getByKeyWord);
saleItemRouter.get("/saleprice/:price",
//  isUserVerefied,
getByPrice
);
saleItemRouter.get("/salestore/:id",
//  isUserVerefied,
  getByStore);
saleItemRouter.post(
  "/sale",
  //  upload.single('img'),
  // isUserVerefied,
  createSaleItem
);
saleItemRouter.put(
  "/sale/:id",
  //  upload.single('img'),
//   isUserVerefied,
//   isAuthorized,
  updateSaleItem
);
saleItemRouter.delete(
  "/sale/:id",
//   isUserVerefied,
//   isAuthorized,
  deleteSaleItem
);

module.exports = {
  saleItemRouter,
};
