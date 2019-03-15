/* Example Recording
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// {
//   _id: "58c08bbed1d97c276fd56ce3",
//   "study": "5c8bc0a3b6b5b4d964f8c125",
//   "directory": "kbucket://15734439d8cf/groundtruth/visapy_mea/set1",
//   "description": "One of the recordings in the visapy_mea study",
//   "sampleRateHz": 32000.0,
//   "numChannels": 30,
//   "durationSec": 300.0,
//   "numTrueUnits": 16,
//   "spikeSign": -1
// },

const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const recordingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a recording name"
  },
  study: {
    type: mongoose.Schema.ObjectId,
    ref: "Study"
  },
  directory: {
    type: String,
    required: "You must provide a directory name"
  },
  description: {
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
