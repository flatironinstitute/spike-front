const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const sorterSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  source: {
    type: String,
    required: "You must provide author(s) of the sorter in this field."
  },
  paperTitle: {
      type: String
  },
  publicationName: {
      type: String, 
    //   Ex: Annual Review of Fluid Mechanics, 51: 539-572
  },
  doi: {
      type: String
    // Ex:  https://doi.org/10.1146/annurev-fluid-122316-045153
  }
  name: {
    type: String,
    required: "You must provide a name for the sorter."
  },
  processorName: {
    type: String,
    required: "You must provide a processor name for the sorter."
  },
  version: {
    type: String,
    required: "You must provide a version for the sorter."
  },
  detectSign: {
    type: Number
    //   Is there a min/max for this?
  },
  adjacencyRadius: {
    type: Number
    //   Is there a min/max for this?
  },
  detectThreshold: {
    type: Number
    //   Is there a min/max for this?
  }
});

module.exports = mongoose.model("Sorter", sorterSchema);