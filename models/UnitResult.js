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
      type: String
    },
    study: {
      type: mongoose.Schema.ObjectId,
      ref: "Study"
    },
    studyName: {
      type: String
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

unitResultSchema.statics.groupBy = function(list, keyGetter) {
  const map = {};
  list.forEach(item => {
    const key = keyGetter(item);
    if (!map[key]) {
      map[key] = [item];
    } else {
      map[key].push(item);
    }
  });
  return map;
};

unitResultSchema.statics.getUnitResultsByStudyAndSorter = function() {
  // filter for only items that have snr
  // aggregate all accuracies
  // aggregate all recalls
  // aggregate all precisions
  return this.aggregate([
    { $match: { snr: { $exists: true } } },
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
            checkAccuracy: "$checkAccuracy",
            checkPrecision: "$checkPrecision",
            checkRecall: "$checkRecall",
            accuracy: {
              $divide: [
                "$numMatches",
                {
                  $add: [
                    "$numMatches",
                    "$numFalsePositives",
                    "$numFalseNegatives"
                  ]
                }
              ]
            },
            precision: {
              $cond: {
                if: { $gte: ["$numMatches", 5] },
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
            },
            recall: {
              $cond: {
                if: { $gte: ["$numMatches", 5] },
                then: {
                  $divide: [
                    "$numMatches",
                    {
                      $add: ["$numMatches", "$numFalseNegatives"]
                    }
                  ]
                },
                else: 0
              }
            }
          }
        },
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model("UnitResult", unitResultSchema);
