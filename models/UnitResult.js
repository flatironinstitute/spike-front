const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const unitResultSchema = new mongoose.Schema(
  {
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
    },
    snr: {
      type: Float
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// create virtual properties for precision, recall, and accuracy
unitResultSchema.virtual("precision").get(function() {
  return this.numMatches / (this.numMatches + this.numFalsePositives);
});

unitResultSchema.virtual("recall").get(function() {
  return this.numMatches / (this.numMatches + this.numFalseNegatives);
});

unitResultSchema.virtual("accuracy").get(function() {
  return (
    this.numMatches /
    (this.numMatches + this.numFalsePositives + this.numFalseNegatives)
  );
});

module.exports = mongoose.model("UnitResult", unitResultSchema);
