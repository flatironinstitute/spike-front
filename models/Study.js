const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// TODO: Add ranges from the component recordings
const studySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the study."
  },
  studySet: {
    type: mongoose.Schema.ObjectId,
    ref: "StudySet"
  },
  sorterNames: {
    type: [String]
  },
  sorters: [{ type: mongoose.Schema.ObjectId, ref: "Sorter" }]
});

module.exports = mongoose.model("Study", studySchema);
