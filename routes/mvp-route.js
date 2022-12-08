const express = require("express");
const mvpController = require("../controllers/mvp-controllers");

const router = express.Router();

router.post("/worker", mvpController.addWorkerRole);

router.post("/ingredient", mvpController.addIngredient);

module.exports = router;