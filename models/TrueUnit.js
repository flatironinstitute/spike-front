const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const trueUnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a unit name"
  },
  meanFiringRateHz: {
    type: Number
  },
  numEvents: {
    type: Number
  },
  peakChannel: {
    type: Number
  },
  recording: {
    type: mongoose.Schema.ObjectId,
    ref: "Recording"
  },
  snr: {
    type: Number,
    required: "You must provide an snr."
  },
  study: {
    type: mongoose.Schema.ObjectId,
    ref: "Study"
  }
});

module.exports = mongoose.model("TrueUnit", trueUnitSchema);
