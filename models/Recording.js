/* Example Recording
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// Note: Here I used the existing names, however new names could be applied if needed.
// The string that represents study here is an ObjectId (foreign key) from the study document.
// I can structure the document injest such that I can manually add the foreign keys.
// Or, map the relationship properties later if the text names provided are sufficiently detailed.
//
// Also, what data is in the directory here that is not included elsewhere?
//
// {
//   _id: "58c08bbed1d97c276fd56ce3",
//   name: "001_synth",
//   study: "58c03ada8060197ca0b52d52",
//   directory: "kbucket://15734439d8cf/groundtruth/magland_synth/datasets_noise10_K10_C4/001_synth",
//   description: "One of the recordings in the magland_synth_noise10_K10_C4 study"
// }

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const recordingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a recording name"
  },
  study: {
    type: Schema.Types.ObjectId,
    ref: "Study"
  },
  directory: {
    type: String,
    required: "You must provide a directory name"
  },
  description: {
    type: String,
    required: "You must provide a description name"
  }
});

module.exports = mongoose.model("Recording", recordingSchema);
