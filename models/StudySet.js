/* Example Study Set
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// Note: These do not currently exist in the data.
// I've not included any properties beyond name and children.
//
// {
//   _id: "58c039018060197ca0b52d4c",
//   name: "magland_synth",
//   studies: ["58c03ada8060197ca0b52d52","58c03ada8060197ca0b52d53"]
// }

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const studySetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the study set."
  },
  studies: [{ type: Schema.Types.ObjectId, ref: "Study" }]
});

module.exports = mongoose.model("StudySet", studySetSchema);
