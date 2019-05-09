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
    sorterName: {
      type: String,
      index: true
    },
    study: {
      type: mongoose.Schema.ObjectId,
      ref: "Study"
    },
    studyName: {
      type: String,
      index: true
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
    bestbestSortedUnitId: {
      type: Number
    },
    snr: {
      type: Float
    },
    spikesprayUrl: {
      type: String,
      default:
        "http://kbucket.flatironinstitute.org/get/sha1/0aa39927530abed94f32c410f3a2226e2ee71c5e?signature=c516794c53257b327f39b8349cc39313f1a254e9"
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// create virtual properties for precision, recall, and accuracy
unitResultSchema.virtual("precision").get(function() {
  if (this.numMatches + this.numFalsePositives > 1) {
    return this.numMatches / (this.numMatches + this.numFalsePositives);
  } else {
    return 0;
  }
});

unitResultSchema.virtual("recall").get(function() {
  if (this.numMatches + this.numFalseNegatives > 1) {
    return this.numMatches / (this.numMatches + this.numFalseNegatives);
  } else {
    return 0;
  }
});

unitResultSchema.virtual("accuracy").get(function() {
  if (this.numMatches + this.numFalsePositives + this.numFalseNegatives > 1) {
    return (
      this.numMatches /
      (this.numMatches + this.numFalsePositives + this.numFalseNegatives)
    );
  } else {
    return 0;
  }
});

unitResultSchema.statics.getUnitResultsByStudy = function(study) {
  // TODO: Switch to this more efficient DB Call
  // return this.find({ studyName: study.name });
  return this.aggregate([
    { $match: { studyName: study.name } },
    {
      $group: {
        _id: {
          sorterName: "$sorterName",
          studyName: "$studyName"
        },
        unitResults: {
          $push: {
            _id: "$_id",
            sorter: "$sorter",
            study: "$study",
            snr: "$snr",
            checkAccuracy: "$checkAccuracy",
            checkRecall: "$checkRecall",
            checkPrecision: "$checkPrecision",
            unitId: "$unitId",
            numMatches: "$numMatches",
            numFalsePositives: "$numFalsePositives",
            recording: "$recording",
            bestbestSortedUnitId: "$bestbestSortedUnitId",
            precision: {
              $cond: {
                if: { $gte: ["$numMatches", 1] },
                then: {
                  $divide: [
                    "$numMatches",
                    {
                      $add: ["$numMatches", "$numFalsePositives"]
                    }
                  ]
                },
                else: 0
              }
            }
          }
        }
      }
    }
  ]).allowDiskUse(true);
};

unitResultSchema.statics.getAllUnitResultsByNestedStudySorter = function() {
  return this.aggregate([
    {
      $group: {
        _id: {
          sorterName: "$sorterName",
          studyName: "$studyName"
        },
        unitResults: {
          $push: {
            _id: "$_id",
            sorter: "$sorter",
            study: "$study",
            snr: "$snr",
            checkAccuracy: "$checkAccuracy",
            checkRecall: "$checkRecall",
            checkPrecision: "$checkPrecision",
            unitId: "$unitId",
            numMatches: "$numMatches",
            numFalsePositives: "$numFalsePositives",
            recording: "$recording",
            bestbestSortedUnitId: "$bestbestSortedUnitId",
            precision: "$precision"
          }
        }
      }
    }
  ]).allowDiskUse(true);
};

module.exports = mongoose.model("UnitResult", unitResultSchema);
