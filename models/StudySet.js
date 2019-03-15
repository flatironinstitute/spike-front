const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const studySetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the study set."
  }
});

module.exports = mongoose.model("StudySet", studySetSchema);
