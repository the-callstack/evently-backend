"use strict";

const { express } = require("../../../config");
const { checkBearer } = require("../../controllers/auth-controllers/checkBearer");
const {
  isAuthorized,
} = require("../../controllers/auth-controllers/isAuthorized");
const {
  isUserVerefied,
} = require("../../controllers/auth-controllers/isUserVerefied");
const {
  getAllRentalItems,
  getByCategory,
  getRentalItemDetails,
  createRentalItem,
  updateRentalItem,
  deleteRentalItem,
  getByStore,
  getByPrice
} = require("./rentalItem-controller");

const rentalItemRouter = express.Router();

rentalItemRouter.get("/rental/:id",
// isUserVerefied,
getRentalItemDetails
);
rentalItemRouter.post("/rental",
// isUserVerefied,
createRentalItem);
rentalItemRouter.get("/rental",
//  checkBearer,
 getAllRentalItems
 );

rentalItemRouter.get("/rentalcat/:id",
 getByCategory
 );
rentalItemRouter.get("/rentalstore?",
 getByStore
 );
rentalItemRouter.get("/rentalprice/:price",
 getByPrice
 );
rentalItemRouter.put(
  "/rental/:id",
//   isUserVerefied,
//   isAuthorized,
  updateRentalItem
);
rentalItemRouter.delete(
  "/rental/:id",
//   isUserVerefied,
//   isAuthorized,
  deleteRentalItem
);

module.exports = {
  rentalItemRouter,
};
