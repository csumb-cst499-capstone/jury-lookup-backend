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
///////////////////////////////////////////////////////////////////////
exports.getJurorByBadgeAndPin = async (req, res) => {

  try {
    const { badgeNumber, pinNumber } = req.body;

    // Find the juror
    const jurors = await JurorModel.findOne({
      BadgeNumber: badgeNumber,
      PinCode: pinNumber
    });

    if (!jurors) {
      return res.status(404).json({ message: 'Juror not found' });
    }

    // Extract details
    const { SummonsDate, ReportingLocation, GroupNumber, CanPostpone } = jurors;

    // response
    const response = {
      SummonsDate,
      ReportingLocation,
      GroupNumber,
      CanPostpone
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

//////to post update new date
exports.postponeSummon = async (req, res) => {
    try {
      const { badgeNumber, pinNumber, postponingDate } = req.body;
  
      // Find the juror in the database using the provided badgeNumber and pinNumber
      const juror = await JurorModel.findOne({
        BadgeNumber: badgeNumber,
        PinCode: pinNumber
      });
  
      if (!juror) {
        return res.status(404).json({ message: 'Juror not found' });
      }
  
      const summonDate = new Date(juror.SummonsDate);
      const postponingDateObj = new Date(postponingDate);
  
      const timeDifference = postponingDateObj.getTime() - summonDate.getTime();
  
      const differenceInWeeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));
  
      if (differenceInWeeks > 6) {
        return res.status(400).json({ message: 'Postponing date exceeds the allowed limit of 6 weeks' });
      }
  
      //juror.SummonsDate = postponingDateObj.toISOString();
      juror.SummonsDate = postponingDateObj.toISOString().slice(0, 10); 
      await juror.save();
  
      res.json({
        message: 'Summon postponed successfully',
        //newSummonDate: postponingDateObj.toISOString().split('T')[0] 
        //newSummonDate: newSummonDate.toISOString().split('T')[0]
        newSummonDate: juror.SummonsDate
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };