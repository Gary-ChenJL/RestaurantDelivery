const express = require("express");
const mvpController = require("../controllers/mvp-controllers");

const router = express.Router();

router.post("/employee/worker", mvpController.addWorkerRole);

router.post("/payload/ingredient", mvpController.addIngredient);

module.exports = router;