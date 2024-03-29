const express = require("express");
const router = express.Router();
const jurorController = require("../controllers/juror_controller");
const adminController = require("../controllers/admin_controller");
//const { jwtCheck, checkScopes } = require("../middlewares/auth0_middleware");
//require("../middlewares/auth0_middleware");

// Get all Method
router.get("/getAll", jurorController.jurorGetAll);

// Get by ID Method
router.get("/getOne/:badgeNumber", jurorController.jurorGetOne);

// verify token
router.post("/verify", jurorController.verify);

// Post method to login
router.post("/login", jurorController.jurorLogin);

// Post method to postpone
router.post("/editSummons", jurorController.jurorEditSummons);

// Get ReportingLocations
router.get(
  "/getReportingLocations",
  jurorController.jurorGetReportingLocations
);

// Change postpone status
router.post("/changePostponeStatus", jurorController.jurorChangeCanPostpone);

// Reset summons date
router.post("/resetSummonsTest", jurorController.jurorResetSummonsTest);

// Get Summon Details
router.post("/summon", jurorController.jurorSummonDetails);

// search for juror
router.get("/admin/search", adminController.adminSearch);

router.patch("/admin/juror/edit/:id", adminController.adminEditJuror);

router.get("/admin/juror/:id", adminController.adminGetOne);

module.exports = router;
