const JurorModel = require("../models/juror_model");
require('express-async-errors');
const CONSTANT = require("../constants/JUROR_CONSTANTS")

exports.juror_getAll = async (req, res) => {
    try {
        const jurors = await JurorModel.find().limit(CONSTANT.MAX_GET_ALL);
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get juror by badge number and pin
exports.juror_getSummonDetails = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const { BadgeNumber, PinCode } = req.params;
        const juror = await Juror.findOne({ BadgeNumber, PinCode });

        if (!juror) {
            return res.status(404).json({ message: "Juror not found" });
        }
        const { SummonsDate, MailingAddress, City, State, GroupNumber, CanPostpone } = juror;
        res.json({ SummonsDate, MailingAddress, City, State, GroupNumber, CanPostpone });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.juror_postponeSummon = async (req, res) => {
    try {
        const { BadgeNumber, PinCode, postponeDate } = req.params;
        const juror = await Juror.findOne({ BadgeNumber, PinCode });

        if (!juror) {
            return res.status(404).json({ message: "Juror not found" });
        }

        if (!juror.CanPostpone) {
            return res.status(403).json({ message: "Juror cannot postpone" });
        }

        const sixWeeksFromSummonDate = new Date(juror.SummonsDate);
        sixWeeksFromSummonDate.setDate(sixWeeksFromSummonDate.getDate() + CONSTANT.MAX_DAYS_TO_POSTPONE); // Add 42 days (6 weeks)

        const postponeDateTime = new Date(postponeDate);
        if (postponeDateTime > sixWeeksFromSummonDate) {
            return res.status(400).json({ message: "Postpone date exceeds 6 weeks from summon date" });
        }

        // Update the summonDate with the new postpone date
        juror.SummonsDate = postponeDate;
        juror.CanPostpone = false;
        await juror.save();

        res.json({ message: "Summon date postponed successfully" });
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
        if (newDate > serviceDate + CONSTANT.MAX_DAYS_TO_POSTPONE) {
            return res.status(404).json({ message: "Postpone date must be within 6 weeks of service date" });
        }

        foundJuror.SummonsDate = req.body.PostponeDate;
        foundJuror.CanPostpone = false;
        const newJuror = await foundJuror.save();

        res.json(newJuror);
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
