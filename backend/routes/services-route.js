const express = require("express");
const servicesController = require("../controllers/services-controller");

const router = express.Router();

router.post("/ingredient/add", servicesController.addIngredient);

module.exports = router;