/* Example Study
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// {
//   _id: "58c03ada8060197ca0b52d52",
//   name: "magland_synth_noise10_K10_C4",
//   description: "This is a description of magland synth.",
//   sorters: ["511bde3e3985283f25000004","58c061518060197ca0b52d5e"]
// }

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const studySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the study."
  },
  description: {
    type: String,
    required: "You must provide a description name"
  },
  sorters: [{ type: mongoose.Schema.ObjectId, ref: "Sorter" }]
});

module.exports = mongoose.model("Study", studySchema);
