const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const studySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the study."
  },
  studySet: {
    type: mongoose.Schema.ObjectId,
    ref: "StudySet"
  },
  studySetName: {
    type: String
  },
  sorterNames: {
    type: [String]
  },
  sorters: [{ type: mongoose.Schema.ObjectId, ref: "Sorter" }]
});

function autopopulate(next) {
  this.populate("sorters");
  next();
}

studySchema.pre("find", autopopulate);
studySchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Study", studySchema);
