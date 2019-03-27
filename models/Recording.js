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
  directory: {
    type: String,
    required: "You must provide a directory name"
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
  },
  trueUnits: [{ type: mongoose.Schema.ObjectId, ref: "TrueUnit" }]
});

//find true units where the recordings _id property === true unit recording property
// recordingSchema.virtual("trueUnits", {
//   ref: "TrueUnit", // what model to link?
//   localField: "_id", // which field on the recording?
//   foreignField: "recording" // which field on the true unit?
// });

// function autopopulate(next) {
//   // this.populate("study");
//   this.populate("trueUnits");
//   next();
// }

// recordingSchema.pre("find", autopopulate);
// recordingSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Recording", recordingSchema);
