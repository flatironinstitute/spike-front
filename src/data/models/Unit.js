const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const unitSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  unitId: {
    type: String,
    // TODO: Is this a string or a number?
    required: "You must provide an ID for the study."
  },
  snr: {
    type: Number,
    required: "You must provide an snr."
  },
  peakChannel: {
    type: Number
  },
  numEvents: {
    type: Number
  },
  firingRate: {
    type: Number
  },
  fileSizeBytes: {
    type: Number
  },
  numGroundTruthUnits: {
    type: Number
  },
  recording: {
    type: String,
    required: "You must provide a recording name"
  },
  study: {
    type: Schema.Types.ObjectId,
    ref: "Study"
  }
});

module.exports = mongoose.model("Unit", unitSchema);

// NOTES: Which of these is required?
// TODO: should I include an array of the sorters 🤔?
