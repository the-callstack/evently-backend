"use strict";

const { express } = require("../../../config");
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
  getByStore
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
 getAllRentalItems
 );
rentalItemRouter.get("/rentalcat?",
 getByCategory
 );
rentalItemRouter.get("/rentalstore?",
 getByStore
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
