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
    try {
        const foundJuror = await JurorModel.findOne({ BadgeNumber: req.body.BadgeNumber, PinCode: req.body.PinCode });
        res.json(foundJuror);
        console.log("found juror");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
