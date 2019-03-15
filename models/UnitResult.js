const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const unitResultSchema = new mongoose.Schema({
  unitId: {
    type: Number,
    required: "You must provide a unit id for the unit result."
  },
  recording: {
    type: mongoose.Schema.ObjectId,
    ref: "Recording"
  },
  study: {
    type: mongoose.Schema.ObjectId,
    ref: "Study"
  },
  sorter: {
    type: mongoose.Schema.ObjectId,
    ref: "Sorter"
  },
  numMatches: {
    type: Number
  },
  numFalseNegatives: {
    type: Number
  },
  numFalsePositives: {
    type: Number
  },
  checkAccuracy: {
    type: Float
  },
  checkPrecision: {
    type: Float
  },
  checkRecall: {
    type: Float
  },
  bestSortedUnitId: {
    type: Number
  }
});

module.exports = mongoose.model("UnitResult", unitResultSchema);
