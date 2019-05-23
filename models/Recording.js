const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const recordingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a recording name"
  },
  study: {
    type: mongoose.Schema.ObjectId,
    ref: "Study"
  },
  studyName: {
    type: String
  },
  studySetName: {
    type: String
  },
  directory: {
    type: String,
    required: "You must provide a directory name"
  },
  firingsTrue: {
    type: String,
    required: "sha1:// of the true firings file"
  },
  description: {
    type: String,
    required: "You must provide a description name"
  },
  sampleRateHz: {
    type: Float
  },
  numChannels: {
    type: Number
  },
  durationSec: {
    type: Float
  },
  numTrueUnits: {
    type: Number
  },
  spikeSign: {
    type: Number
  }
});

function autopopulate(next) {
  this.populate("study");
  next();
}

recordingSchema.pre("find", autopopulate);
recordingSchema.pre("findOne", autopopulate);

recordingSchema.statics.getRecordingsByStudy = function() {
  return this.aggregate([
    {
      $group: {
        _id: "$studyName",
        recordings: {
          $push: {
            id: "$_id",
            name: "$name",
            studySetName: "$studySetName",
            description: "$description",
            sampleRateHz: "$sampleRateHz",
            numChannels: "$numChannels",
            durationSec: "$durationSec",
            numTrueUnits: "$numTrueUnits",
            spikeSign: "$spikeSign",
            study: "$study"
          }
        }
      }
    }
  ]);
};

module.exports = mongoose.model("Recording", recordingSchema);
