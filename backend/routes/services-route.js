const express = require("express");
const servicesController = require("../controllers/services-controller");

const router = express.Router();

router.post("/ingredient/add", servicesController.addIngredient);

router.post("/drone/add", servicesController.addDrone);

router.post("/add", servicesController.addService);

router.post("/manage", servicesController.manageService);

router.post("/drone/takeover", servicesController.takeoverDrone);

router.post("/drone/joinswarm", servicesController.joinSwarm);

router.post("/drone/leaveswarm", servicesController.leaveSwarm);

router.post("/drone/load", servicesController.loadDrone);

router.post("/drone/refuel", servicesController.refuelDrone);

router.post("/drone/fly", servicesController.flyDrone);

router.post("/ingredient/purchase", servicesController.purchaseIngredient);

router.post("/ingredient/remove", servicesController.removeIngredient);

router.post("/drone/remove", servicesController.refuelDrone);

module.exports = router;