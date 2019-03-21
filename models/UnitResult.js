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
  accuracy: {
    type: Float
  },
  checkPrecision: {
    type: Float
  },
  precision: {
    type: Float
  },
  checkRecall: {
    type: Float
  },
  recall: {
    type: Float
  },
  bestSortedUnitId: {
    type: Number
  }
});

unitResultSchema.pre("insertMany", async function(next) {
  this.precision = this.numMatches / (this.numMatches + this.numFalsePositives);
  this.recall = this.numMatches / (this.numMatches + this.numFalseNegatives);
  this.accuracy =
    this.numMatches /
    (this.numMatches + this.numFalsePositives + this.numFalseNegatives);

  next();
});

module.exports = mongoose.model("UnitResult", unitResultSchema);
