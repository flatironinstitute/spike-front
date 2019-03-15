const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const sorterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must provide a name for the sorter."
  },
  algorithm: {
    type: String,
    required: "You must provide a parent algorithm"
  },
  processorName: {
    type: String,
    required: "You must provide a processor name for the sorter."
  },
  processorVersion: {
    type: String,
    required: "You must provide a version for the sorter."
  },
  sorting_parameters: {
    type: Map
  }
});

module.exports = mongoose.model("Sorter", sorterSchema);
