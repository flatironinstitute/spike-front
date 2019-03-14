/* Example Recording
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// {
//   _id: "58c08bbed1d97c276fd56ce3",
//   directory: "kbucket://15734439d8cf/groundtruth/magland_synth/datasets_noise10_K10_C4/001_synth",
//   durationSec: 30,
//   fileSizeBytes: 123,
//   name: "001_synth",
//   numChannels: 4,
//   numTrueUnits: 100,
//   sampleRateHz: 12.123,
//   spikeSign: -1,
//   study: "58c03ada8060197ca0b52d52",
// }

const mongoose = require("mongoose");
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
  durationSec: {
    type: Number
  },
  fileSizeBytes: {
    type: Number
  },
  name: {
    type: String,
    required: "You must provide a recording name"
  },
  numChannels: {
    type: Number
  },
  numTruthUnits: {
    type: Number
  },
  sampleRateHz: {
    type: Number
  },
  spikeSign: {
    type: Number
  },
  study: {
    type: mongoose.Schema.ObjectId,
    ref: "Study"
  }
});

module.exports = mongoose.model("Recording", recordingSchema);
