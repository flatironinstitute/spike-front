const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const spikeSpraySchema = new mongoose.Schema({
  studyName: {
    type: String,
    required: "Name of the study."
  },
  recordingName: {
    type: String,
    required: "Name of the recording."
  },
  sorterName: {
    type: String,
    required: "Name of the sorter."
  },
  trueUnitId: {
    type: Number,
    required: "ID of the true unit."
  },
  sortedUnitId: {
    type: Number,
    required: "ID of the sorted unit."
  },
  spikesprayUrl: {
    type: String,
    required: "http url to the spikespray data"
  }
});

module.exports = mongoose.model("SpikeSpray", spikeSpraySchema);
