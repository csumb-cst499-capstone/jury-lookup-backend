const JurorModel = require('../models/juror_model')
require('express-async-errors')
const CONSTANT = require('../constants/JUROR_CONSTANTS')

exports.jurorGetAll = async (req, res) => {
  try {
    const jurors = await JurorModel.find().limit(CONSTANT.MAX_GET_ALL)
    res.json(jurors)
    console.log(jurors.length)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.jurorGetOne = async (req, res) => {
  try {
    const juror = await JurorModel.findById(req.params.id)
    res.json(juror)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.jurorLogin = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  try {
    const foundJuror = await JurorModel.findOne({
      BadgeNumber: req.body.BadgeNumber,
      PinCode: req.body.PinCode
    })
    if (!foundJuror) {
      res.status(404).json({ message: 'Juror not found' })
    }
<<<<<<< HEAD
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
=======

    const {
      FirstName,
      LastName,
      BadgeNumber,
      SummonsDate,
      MailingAddress,
      City,
      State,
      GroupNumber,
      CanPostpone
    } = foundJuror
    res.json({
      FirstName,
      LastName,
      BadgeNumber,
      SummonsDate,
      MailingAddress,
      City,
      State,
      GroupNumber,
      CanPostpone
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.jurorPostpone = async (req, res) => {
  try {
    const foundJuror = await JurorModel.findOne({
      BadgeNumber: req.body.BadgeNumber,
      PinCode: req.body.PinCode
    })
    if (!foundJuror) {
      return res.status(404).json({ message: 'Juror not found' })
    }
    const newDate = new Date(req.body.PostponeDate + 'T00:00:00Z')
    const serviceDate = new Date(foundJuror.SummonsDate + 'T00:00:00Z')

    if (!foundJuror.CanPostpone) {
      return res.status(404).json({ message: 'Juror cannot postpone' })
    }

    if (newDate.getDay() !== 1) {
      return res.status(404).json({ message: 'Postpone date must be a Monday' })
    }
    if (newDate < serviceDate) {
      return res
        .status(404)
        .json({ message: 'Postpone date must be after service date' })
    }
    if (newDate > serviceDate + CONSTANT.MAX_DAYS_TO_POSTPONE) {
      return res.status(404).json({
        message: 'Postpone date must be within 6 weeks of service date'
      })
    }

    foundJuror.SummonsDate = req.body.PostponeDate
    foundJuror.CanPostpone = false
    const newJuror = await foundJuror.save()

    res.json(newJuror)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
exports.jurorChangeCanPostpone = async (req, res) => {
  try {
    const foundJuror = await JurorModel.findOne({
      BadgeNumber: req.body.BadgeNumber,
      PinCode: req.body.PinCode
    })
    if (!foundJuror) {
      res.status(404).json({ message: 'Juror not found' })
    }
    foundJuror.CanPostpone = req.body.CanPostpone
    const newJuror = await foundJuror.save()

    res.json(newJuror)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
>>>>>>> f6641de28c2d868f9d1d3a14946f31ae5c527799
