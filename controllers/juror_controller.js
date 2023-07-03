const JurorModel = require("../models/juror_model");
require("express-async-errors");
const CONSTANT = require("../constants/JUROR_CONSTANTS");
const JWT = require("../utils/jwt_utils");
const logger = require("../logger/logger");

exports.jurorGetAll = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const jurors = await JurorModel.find().limit(CONSTANT.MAX_GET_ALL);

    res.json(jurors);

    logger.info("Juror get all successful");
  } catch (err) {
    logger.error("Error retrieving all jurors", { error: err.message });
    res.status(500).json({ message: err.message });
  }
};

exports.jurorGetOne = async (req, res) => {
  try {
    const juror = await JurorModel.findById(req.params.id);

    res.json(juror);
  } catch (err) {
    logger.error("Error retrieving juror", {
      error: err.message,
      jurorId: req.params.id,
    });
    res.status(500).json({ message: err.message });
  }
};

exports.jurorLogin = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const foundJuror = await verifyCredentials(
      req.body.BadgeNumber,
      req.body.PinCode
    );
    if (!foundJuror) {
      logger.error("Invalid credentials", {
        badgeNumber: req.body.BadgeNumber,
        pinCode: req.body.PinCode,
      });

      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = JWT.generateToken(foundJuror);
    res.header("Authorization", token);
    res.json({ token });
  } catch (err) {
    logger.error("Error during login", {
      error: err.message,
      badgeNumber: req.body.BadgeNumber,
      pinCode: req.body.PinCode,
    });

    res.status(500).json({ message: err.message });
  }
};

exports.verify = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  JWT.verifyToken(req, res, () => {
    res.status(200).json({ message: "Valid token" });
  });
};

exports.jurorSummonDetails = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    JWT.verifyToken(req, res, async () => {
      const foundJuror = await JurorModel.findOne({
        BadgeNumber: req.body.BadgeNumber,
      });

      if (!foundJuror) {
        return res.status(404).json({ message: "Juror not found" });
      }

      const {
        FirstName,
        LastName,
        BadgeNumber,
        SummonsDate,
        GroupNumber,
        ReportingLocation,
        CanPostpone,
      } = foundJuror;

      res.json({
        FirstName,
        LastName,
        BadgeNumber,
        SummonsDate,
        GroupNumber,
        ReportingLocation,
        CanPostpone,
      });
    });
  } catch (err) {
    logger.error("Error retrieving juror summon details", {
      error: err.message,
      badgeNumber: req.body.BadgeNumber,
    });
    res.status(500).json({ message: err.message });
  }
};

exports.jurorPostpone = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    JWT.verifyToken(req, res, async () => {
      const foundJuror = await JurorModel.findOne({
        BadgeNumber: req.body.BadgeNumber,
      });

      if (!foundJuror) {
        return res.status(404).json({ message: "Juror not found" });
      }

      logger.debug("postpone date:", req.body.PostponeDate);
      const newDate = new Date(req.body.PostponeDate + "T00:00:00Z");
      const serviceDate = new Date(foundJuror.SummonsDate + "T00:00:00Z");

      logger.debug("newDate:", newDate);
      logger.debug("day of the week:", newDate.getDay());

      if (!foundJuror.CanPostpone) {
        return res.status(404).json({ message: "Juror cannot postpone" });
      }

      if (newDate.getDay() !== 1) {
        return res
          .status(404)
          .json({ message: "Postpone date must be a Monday" });
      }

      if (newDate < serviceDate) {
        return res
          .status(404)
          .json({ message: "Postpone date must be after service date" });
      }

      if (newDate > serviceDate + CONSTANT.MAX_DAYS_TO_POSTPONE) {
        return res.status(404).json({
          message: "Postpone date must be within 6 weeks of service date",
        });
      }

      foundJuror.SummonsDate = req.body.PostponeDate;
      foundJuror.CanPostpone = false;
      const newJuror = await foundJuror.save();
      const {
        FirstName,
        LastName,
        BadgeNumber,
        SummonsDate,
        GroupNumber,
        ReportingLocation,
        CanPostpone,
      } = newJuror;

      res.json({
        FirstName,
        LastName,
        BadgeNumber,
        SummonsDate,
        GroupNumber,
        ReportingLocation,
        CanPostpone,
      });
    });
  } catch (err) {
    logger.error("Error postponing juror", {
      error: err.message,
      badgeNumber: req.body.BadgeNumber,
    });
    res.status(500).json({ message: err.message });
  }
};

exports.jurorChangeCanPostpone = async (req, res) => {
  try {
    JWT.verifyToken(req, res, async () => {
      const foundJuror = await JurorModel.findOne({
        BadgeNumber: req.body.BadgeNumber,
      });
      if (!foundJuror) {
        logger.error("Juror not found", {
          badgeNumber: req.body.BadgeNumber,
        });
        res.status(404).json({ message: "Juror not found" });
      }
      foundJuror.CanPostpone = req.body.CanPostpone;
      const newJuror = await foundJuror.save();

      res.json(newJuror);
    });
  } catch (err) {
    logger.error("Error changing CanPostpone status", {
      error: err.message,
      badgeNumber: req.body.BadgeNumber,
    });
    res.status(500).json({ message: err.message });
  }
};

const verifyCredentials = async (BadgeNumber, PinCode) => {
  try {
    const juror = await JurorModel.findOne({ BadgeNumber, PinCode });
    if (!juror) {
      return null;
    }

    const isValidPinCode = juror.PinCode === PinCode;

    if (!isValidPinCode) {
      return null;
    }

    return juror;
  } catch (err) {
    return null;
  }
};
