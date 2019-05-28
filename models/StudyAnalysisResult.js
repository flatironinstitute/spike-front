const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const studyAnalysisResultSchema = new mongoose.Schema(
  {
    studyName: {
      type: String,
      required: "Name of the study."
    },
    studySetName: {
      type: String,
      required: "Name of the study set."
    },
    recordingNames: {
      type: [String],
      required: "Names of the recordings in the study"
    },
    trueSnrs: {
      type: [Number],
      required: "SNRS of the true units"
    },
    trueFiringRates: {
      type: [Number],
      required: "firing rates of the true units"
    },
    trueNumEvents: {
      type: [Number],
      required: "num events of the true units"
    },
    trueRecordingIndices: {
      type: [Number],
      required: "recording indices of the true units"
    },
    trueUnitIds: {
      type: [Number],
      required: "unit ids of the true units"
    },
    sortingResults: {
      type: [{
          sorterName: {
              type: String
          },
          accuracies: {
              type: [Number]
          },
          precisions: {
              type: [Number]
          },
          recalls: {
              type: [Number]
          },
          numMatches: {
            type: [Number]
          },
          numFalsePositives: {
              type: [Number]
          },
          numFalseNegatives: {
            type: [Number]
          },
          cpuTimesSec: {
            type: [Number]
          }
      }]
    },
  }
);

module.exports = mongoose.model("StudyAnalysisResult", studyAnalysisResultSchema);
