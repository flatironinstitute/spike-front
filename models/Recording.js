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

function autopopulate(next) {
  this.populate("study");
  next();
}

recordingSchema.pre("find", autopopulate);
recordingSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Recording", recordingSchema);
