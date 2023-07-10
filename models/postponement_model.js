const mongoose = require("mongoose");

const {
  logFindQuery,
  logFindOneQuery,
  logSaveOperation,
  logUpdateOperation,
  logDeleteOperation,
} = require("../middlewares/db_log_middleware");

const Schema = mongoose.Schema;
const postponementSchema = new Schema(
  {
    TimeStamp: {
      type: String,
      required: true,
    },
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

    OriginalSummonsDate: {
      type: String,
      required: true,
    },
    NewSummonsDate: {
      type: String,
      required: true,
    },
    GroupNumber: {
      type: String,
      required: true,
    },
    OriginalReportingLocation: {
      type: String,
      required: true,
    },
    NewReportingLocation: {
      type: String,
      required: true,
    },
  },
  { collection: "postponements" }
);
postponementSchema.pre("find", logFindQuery);
postponementSchema.pre("findOne", logFindOneQuery);
postponementSchema.pre("save", logSaveOperation);
postponementSchema.pre("updateOne", logUpdateOperation);
postponementSchema.pre("deleteOne", logDeleteOperation);

const Postponement = mongoose.model("postponement", postponementSchema);
module.exports = Postponement;
