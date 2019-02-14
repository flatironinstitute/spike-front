const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const studySchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now()
  },
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
  numChannels: {
    type: [Number]
  },
  samplerateHz: {
    type: [Number]
  },
  fileSizeBytes: {
    type: [Number]
  },
  numGroundTruthUnits: {
    type: [Number]
  },
  electrodeType: {
    type: String,
    required: "You must provide an electrode type"
    // TODO: Should this be a controlled vocabulary?
  },
  brainRegion: {
    type: String
  },
  experimentType: {
    type: String
    // TODO: Should this be a controlled vocabulary?
    // Ex: in vivo, synthetic, in vitro
  },
  recordingDevice: {
    type: String
    // TODO: Should this be a controlled vocabulary?
    // Ex: neuropixels-3.75
  },
  sorters: [{ type: Schema.Types.ObjectId, ref: "Sorter" }]
});

module.exports = mongoose.model("Study", studySchema);
