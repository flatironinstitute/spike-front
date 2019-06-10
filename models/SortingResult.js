const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const sortingResultSchema = new mongoose.Schema({
  recordingName: {
    type: String,
    ref: "Recording"
  },
  studyName: {
    type: String
  },
  sorterName: {
    type: String,
    ref: "Sorter"
  },
  firings: {
    type: String, /* sha1:// of the firings file */
  },
  firingsTrue: {
    type: String,
    required: "sha1:// of the firings true file"
  },
  recordingDirectory: {
    type: String
  },
  cpuTimeSec: {
    type: Float
  },
  consoleOut: {
    type: String /* sha1:// of console output */
  },
  container: {
    type: String
  }
});

sortingResultSchema.statics.getCPUsByStudyAndSorter = function() {
  // TODO: Do I need the study or sorter object ids
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
    },
    {
      $group: {
        _id: "$_id.sorterName",
        studyGroup: {
          $push: {
            count: "$count",
            studyName: "$_id.studyName",
            averageCPU: "$averageCPU",
            x: "$_id.studyName",
            y: "$averageCPU"
          }
        }
      }
    }
  ]);
};

sortingResultSchema.statics.getTotalCPU = function() {
  return this.aggregate([
    {
      $group: {
        _id: "",
        cpuTimeSec: { $sum: "$cpuTimeSec" }
      }
    },
    {
      $project: {
        _id: 0,
        cpuTimeSec: "$cpuTimeSec"
      }
    }
  ]);
};

module.exports = mongoose.model("SortingResult", sortingResultSchema);
