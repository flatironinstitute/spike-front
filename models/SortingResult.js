const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const sortingResultSchema = new mongoose.Schema({
  recording: {
    type: mongoose.Schema.ObjectId,
    ref: "Recording"
  },
  sorter: {
    type: mongoose.Schema.ObjectId,
    ref: "Sorter"
  },
  cpuTimeSec: {
    type: Float
  }
});

module.exports = mongoose.model("SortingResult", sortingResultSchema);
