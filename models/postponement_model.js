const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postponementSchema = new Schema(
  {
    BadgeNumber: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    PinCode: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    MailingAddress: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    SummonsDate: {
      type: String,
      required: true,
    },
    GroupNumber: {
      type: String,
      required: true,
    },
    ReportingLocation: {
      type: String,
      required: true,
    },
    CanPostpone: {
      type: Boolean,
      required: true,
    },
    PostponementDate: {
      type: String,
      required: true,
    },
  },
  { collection: "postponements" }
);
const Postponement = mongoose.model("postponements", postponementSchema);
module.exports = Postponement;
