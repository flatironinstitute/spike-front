const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const newsPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("NewsPost", newsPostSchema);
