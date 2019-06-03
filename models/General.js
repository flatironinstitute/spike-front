const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const generalSchema = new mongoose.Schema({
  dateUpdated: {
    type: String,
    required: "A timestamp in isoformat for when the database was updated."
  }
});

module.exports = mongoose.model("General", generalSchema);
