const mongoose = require("mongoose");

const {
  logFindQuery,
  logFindOneQuery,
  logSaveOperation,
  logUpdateOperation,
  logDeleteOperation,
} = require("../middlewares/juror_middleware");

const Schema = mongoose.Schema;
const jurorSchema = new Schema(
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
  },
  { collection: "jurors" }
);
jurorSchema.pre("find", logFindQuery);
jurorSchema.pre("findOne", logFindOneQuery);
jurorSchema.pre("save", logSaveOperation);
jurorSchema.pre("updateOne", logUpdateOperation);
jurorSchema.pre("deleteOne", logDeleteOperation);

const Juror = mongoose.model("jurors", jurorSchema);
module.exports = Juror;
