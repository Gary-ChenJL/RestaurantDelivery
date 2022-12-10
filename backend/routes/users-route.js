const express = require("express");
const usersController = require("../controllers/users-controller");

const router = express.Router();

router.post("/employee/worker", usersController.addWorkerRole);

router.post("/owners", usersController.addOwner);

router.post("/pilot/add", usersController.addEmployee);

router.post("/employee/add", usersController.addEmployee);

router.post("/employee/hire", usersController.hireEmployee);

router.post("/employee/fire", usersController.fireEmployee);

router.post("/pilot/remove", usersController.removePilotRole);

router.get("/view/owner", usersController.displayOwnerView);

router.get("/view/employee", usersController.displayEmployeeView);

router.get("/view/pilot", usersController.displayPilotView);

module.exports = router;