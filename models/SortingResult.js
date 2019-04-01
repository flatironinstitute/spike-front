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
  recordingName: {
    type: String
  },
  sorterName: {
    type: String
  },
  studyName: {
    type: String
  },
  study: {
    type: mongoose.Schema.ObjectId,
    ref: "Study"
  },
  cpuTimeSec: {
    type: Float
  }
});

sortingResultSchema.statics.getCPUsByStudyAndSorter = function() {
  // TODO: Do I need the study or sorter object ids here?
  return this.aggregate([
    // filter for only items that have cpuTimeSec
    { $match: { cpuTimeSec: { $exists: true } } },
    {
      $group: {
        _id: {
          studyName: "$studyName",
          sorterName: "$sorterName"
        },
        averageCPU: { $avg: "$cpuTimeSec" },
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model("SortingResult", sortingResultSchema);
