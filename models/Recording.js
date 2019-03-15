const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const recordingSchema = new mongoose.Schema({
  description: {
    type: String,
    required: "You must provide a description name"
  },
  directory: {
    type: String,
    required: "You must provide a directory name"
  },
  fileSizeBytes: {
    type: Number
  },
  name: {
    type: String,
    required: "You must provide a description name"
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
});

module.exports = mongoose.model("Recording", recordingSchema);
