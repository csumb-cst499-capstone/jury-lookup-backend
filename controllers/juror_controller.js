const JurorModel = require("../models/juror_model");
require('express-async-errors');

exports.juror_getAll = async (req, res) => {
    try {
        const jurors = await JurorModel.find().limit(10);
        res.json(jurors);
        console.log(jurors.length);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.juror_getOne = async (req, res) => {
    try {
        const juror = await JurorModel.findById(req.params.id);
        res.json(juror);

        console.log("found juror");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.juror_login = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const foundJuror = await JurorModel.findOne({ BadgeNumber: req.body.BadgeNumber, PinCode: req.body.PinCode });
        if (!foundJuror) {
            res.status(404).json({ message: "Juror not found" });
        }

        res.json(foundJuror);

        console.log("found juror");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// TODO: implement a postpone functiont that allows a juror to postpone their service to a later date (up to 6 weeks) the juror will be able to postpone their service once and will not be able to postpone again if they have already postponed their service
// allow the juror to select a date from a calendar and then update the juror's service date to the selected date (if the date is within 6 weeks of the their original service date and they may only select a date that is a Monday)
exports.juror_postpone = async (req, res) => {
    try {
        const foundJuror = await JurorModel.findOne({ BadgeNumber: req.body.BadgeNumber, PinCode: req.body.PinCode });
        if (!foundJuror) {
            return res.status(404).json({ message: "Juror not found" });
        }
        const newDate = new Date(req.body.PostponeDate + "T00:00:00Z");
        const serviceDate = new Date(foundJuror.SummonsDate + "T00:00:00Z");

        if (!foundJuror.CanPostpone) {
            return res.status(404).json({ message: "Juror cannot postpone" });
        }

        if (newDate.getDay() != 1) {
            return res.status(404).json({ message: "Postpone date must be a Monday" });
        }
        if (newDate < serviceDate) {
            return res.status(404).json({ message: "Postpone date must be after service date" });
        }
        if (newDate > serviceDate + 42) {
            return res.status(404).json({ message: "Postpone date must be within 6 weeks of service date" });
        }

        foundJuror.SummonsDate = req.body.PostponeDate;
        foundJuror.CanPostpone = false;
        const newJuror = await foundJuror.save();

        res.json(newJuror);
        console.log("Postponed juror");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.juror_changeCanPostpone = async (req, res) => {
    try {
        const foundJuror = await JurorModel.findOne({ BadgeNumber: req.body.BadgeNumber, PinCode: req.body.PinCode });
        if (!foundJuror) {
            res.status(404).json({ message: "Juror not found" });
        }
        foundJuror.CanPostpone = req.body.CanPostpone;
        newJuror = await foundJuror.save();

        res.json(newJuror);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
