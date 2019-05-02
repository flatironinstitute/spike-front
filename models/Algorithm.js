const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const algorithmSchema = new mongoose.Schema({
  label: {
    type: String,
    required: "You must provide a label for the algorithm."
  },
  dockerfile: {
    type: String
  },
  website: {
    type: String
  },
  wrapper: {
    type: String
  },
  authors: {
    type: String
  },
  markdown: {
    type: String
  },
  markdown_link: {
    type: String
  }
});

module.exports = mongoose.model("Algorithm", algorithmSchema);
