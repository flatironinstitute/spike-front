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

// // find the paired recordign and get the study id
// unitResultSchema.virtual("study", {
//   ref: "Recording", // model to link
//   localField: "recording", // field on the ur
//   foreignField: "_id" // field on the study
// });

// unitResultSchema.statics.getUnitResultsByStudyAndSorter = function() {
//   return this.aggregate([
//     // lookup stories and populate their ratings
//     {
//       $lookup: {
//         from: "studies",
//         localField: "_id",
//         foreignField: "story",
//         as: "ratings"
//       }
//     },
//     // filter for only items that have snr
//     { $match: { snr: { $exists: true } } },
//     {
//       $group: {
//         _id: {
//           sorter: "$sorter"
//         },
//         unitResults: {
//           $push: {
//             _id: "$_id",
//             accuracy: "$accuracy",
//             sorter: "$sorter"
//           }
//         },
//         count: { $sum: 1 }
//       }
//     }
//   ]);
// };

module.exports = mongoose.model("UnitResult", unitResultSchema);
