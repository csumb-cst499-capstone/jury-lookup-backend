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
        res.json(foundJuror);
        console.log("found juror");
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
      sixWeeksFromSummonDate.setDate(sixWeeksFromSummonDate.getDate() + 42); // Add 42 days (6 weeks)
  
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
  
