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
  snr: {
    type: Float,
    required: "You must provide an snr."
  }
});

module.exports = mongoose.model("TrueUnit", trueUnitSchema);
