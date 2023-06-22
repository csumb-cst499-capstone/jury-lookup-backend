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

    const {
      FirstName,
      LastName,
      BadgeNumber,
      SummonsDate,
      GroupNumber,
      ReportingLocation,
      CanPostpone
    } = foundJuror
    res.json({
      FirstName,
      LastName,
      BadgeNumber,
      SummonsDate,
      GroupNumber,
      ReportingLocation,
      CanPostpone
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.jurorPostpone = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
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

    if (newDate.getDay() !== 0) {
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
      BadgeNumber: req.body.BadgeNumber
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
