const Juror = require("../models/juror_model");
require('express-async-errors')

exports.juror_getAll = async (req, res) => {
    try {
        const jurors = await Juror.find().limit(10);
        res.json(jurors);
        console.log(jurors.length);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.juror_getOne = async (req, res) => {
    try {
        const juror = await Juror.findById(req.params.id);
        res.json(juror);
        console.log("found juror");
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}


