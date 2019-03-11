/* Example Study
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// Note: The first sorter maps to an _id keys from the sorter example.
// I've included the sorters here for easy display purposes on the landing.
// They could be removed if it is cumbersome.
//
// {
//   _id: "58c03ada8060197ca0b52d52",
//   name: "magland_synth_noise10_K10_C4",
//   numRecordings: 10,
//   durationSec: [600, 600],
//   fileSizeBytes: [288000020, 288000020],
//   numChannels: [4, 4],
//   numGroundTruthUnits: [10, 10],
//   samplerateHz: [30000, 30000],
//   sorters: ["511bde3e3985283f25000004","58c061518060197ca0b52d5e"]
// }

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const studySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the study."
  },
  numRecordings: {
    type: Number,
    required: "You must provide a number of recordings."
  },
  durationSec: {
    type: [Number]
  },
  fileSizeBytes: {
    type: [Number]
  },
  numChannels: {
    type: [Number]
  },
  numGroundTruthUnits: {
    type: [Number]
  },
  samplerateHz: {
    type: [Number]
  },
  sorters: [{ type: Schema.Types.ObjectId, ref: "Sorter" }]
});

module.exports = mongoose.model("Study", studySchema);
