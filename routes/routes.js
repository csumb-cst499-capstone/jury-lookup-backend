const express = require("express");
const router = express.Router();
const jurorController = require("../controllers/juror_controller");

// Get all Method
router.get("/getAll", jurorController.jurorGetAll);

// Get by ID Method
router.get("/getOne/:id", jurorController.jurorGetOne);

// verify token
router.post("/verify", jurorController.verify);

// Post method to login
router.post("/login", jurorController.jurorLogin);

// Post method to postpone
router.post("/postpone", jurorController.jurorPostpone);

// Change postpone status
router.post("/changePostponeStatus", jurorController.jurorChangeCanPostpone);

// Get Summon Details
router.post("/summon", jurorController.jurorSummonDetails);

module.exports = router;
