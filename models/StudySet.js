const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const studySetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the study set."
  },
  description: {
    type: String
  },
  studies: {
    type: [{
      name: {
        type: String,
        required: "You must provide a name for the study."
      },
      studySetName: {
        type: String
      },
      recordings: {
        type:[{
          name: {
            type: String,
            required: "You must provide a recording name"
          },
          studyName: {
            type: String
          },
          studySetName: {
            type: String
          },
          directory: {
            type: String,
            required: "You must provide a directory name"
          },
          firingsTrue: {
            type: String,
            required: "sha1:// of the true firings file"
          },
          sampleRateHz: {
            type: Float
          },
          numChannels: {
            type: Number
          },
          durationSec: {
            type: Float
          },
          numTrueUnits: {
            type: Number
          },
          spikeSign: {
            type: Number
          }
        }]
      }
    }]
  }
});

module.exports = mongoose.model("StudySet", studySetSchema);
