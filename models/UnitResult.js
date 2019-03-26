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

unitResultSchema.methods.getPrecision = function() {
  return this.numMatches / (this.numMatches + this.numFalsePositives);
};

unitResultSchema.methods.getRecall = function() {
  return this.numMatches / (this.numMatches + this.numFalseNegatives);
};

unitResultSchema.methods.getAccuracy = function() {
  return (
    this.numMatches /
    (this.numMatches + this.numFalsePositives + this.numFalseNegatives)
  );
};

// function autopopulate(next) {
//   console.log("In Unit Results autopopulate 🚗");
//   this.precision =
//   this.recall =
//   this.accuracy =
//     this.numMatches /
//     (this.numMatches + this.numFalsePositives + this.numFalseNegatives);
// }

// unitResultSchema.pre("find", autopopulate);
// unitResultSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("UnitResult", unitResultSchema);
