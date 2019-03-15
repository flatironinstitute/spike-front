const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const trueUnitSchema = new mongoose.Schema({
  unitId: {
    type: Number,
    required: "You must provide a unit id"
  },
  meanFiringRateHz: {
    type: Float
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
    type: Float,
    required: "You must provide an snr."
  },
  study: {
    type: mongoose.Schema.ObjectId,
    ref: "Study"
  }
});

module.exports = mongoose.model("TrueUnit", trueUnitSchema);
