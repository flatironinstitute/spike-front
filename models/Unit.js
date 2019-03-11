/* Example Unit
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// Note: The name provided here is an example of a name that could be used
// to parse data before injest.
//
// {
//   _id: "58c039938060197ca0b52d4d",
//   name: "synth_10_K10_C4_001_1",
//   firingRate: 2.33,
//   numEvents: 1398,
//   peakChannel: 0,
//   recording: "58c08bbed1d97c276fd56ce3",
//   snr: 12.173096066945002,
//   study: "58c03ada8060197ca0b52d52",
// }

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a unit name"
  },
  firingRate: {
    type: Number
  },
  numEvents: {
    type: Number
  },
  peakChannel: {
    type: Number
  },
  recording: {
    type: Schema.Types.ObjectId,
    ref: "Recording"
  },
  snr: {
    type: Number,
    required: "You must provide an snr."
  },
  // Liz TODO: Determine if it is worth directly mapping here, or if via recording is enough.
  study: {
    type: Schema.Types.ObjectId,
    ref: "Study"
  }
});

module.exports = mongoose.model("Unit", unitSchema);
