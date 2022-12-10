const express = require("express");
const locationsController = require("../controllers/locations-controller");

router.post("/restaurant/add", locationsController.addRestaurant);

router.post("/add", locationsController.addLocation);

router.post("/restaurant/fund", locationsController.startFunding);

const router = express.Router();
