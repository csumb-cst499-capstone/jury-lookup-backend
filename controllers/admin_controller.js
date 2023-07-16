const JurorModel = require("../models/juror_model");
require("express-async-errors");
const CONSTANT = require("../constants/JUROR_CONSTANTS");
const JWT = require("../utils/jwt_utils");
const logger = require("../logger/logger");
exports.adminSearch = async (req, res) => {
  const { query } = req.query;

  try {
    // Search by badge number, first name, last name, or any other desired field
    const jurors = await JurorModel.find({
      $or: [
        { BadgeNumber: { $regex: query, $options: "i" } },
        { FirstName: { $regex: query, $options: "i" } },
        { LastName: { $regex: query, $options: "i" } },
        { PinCode: { $regex: query, $options: "i" } },
        { Email: { $regex: query, $options: "i" } },
        { MailingAddress: { $regex: query, $options: "i" } },
        { City: { $regex: query, $options: "i" } },
        { State: { $regex: query, $options: "i" } },
        { GroupNumber: { $regex: query, $options: "i" } },
        { ReportingLocation: { $regex: query, $options: "i" } },
        { SummonsDate: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(jurors);
    logger.info("Juror search successful");
  } catch (error) {
    logger.error("Error searching jurors", error);
    res.status(500).json({ error: "An error occurred while searching jurors" });
  }
};
// find by id
exports.adminGetOne = async (req, res) => {
  try {
    const juror = await JurorModel.findById(req.params.id);

    juror
      ? res.json(juror)
      : res.status(404).json({ message: "Juror not found" });
  } catch (err) {
    logger.error("Error retrieving juror", {
      error: err.message,
      id: req.params.id,
    });
    res.status(500).json({ message: err.message });
  }
};

exports.adminEditJuror = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const foundJuror = await JurorModel.findById(req.params.id);

    if (!foundJuror) {
      return res.status(404).json({ message: "Juror not found" });
    }

    // Update the juror's fields based on the fields sent in the request body
    for (const field in req.body) {
      foundJuror[field] = req.body[field];
    }

    // Save the updated juror
    const updatedJuror = await foundJuror.save();

    res.json(updatedJuror);
  } catch (err) {
    logger.error("Error editing juror", {
      error: err.message,
      badgeNumber: req.body.BadgeNumber,
    });
    res.status(500).json({ message: err.message });
  }
};
