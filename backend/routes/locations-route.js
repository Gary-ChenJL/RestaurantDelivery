const express = require("express");
const locationsController = require("../controllers/locations-controller");

const router = express.Router();

router.post("/restaurant/add", locationsController.addRestaurant);

router.post("/add", locationsController.addLocation);

router.post("/restaurant/fund", locationsController.startFunding);

router.get("/view", locationsController.displayLocationView);

module.exports = router;