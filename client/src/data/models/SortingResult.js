const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const sortingResultSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  sorter: {
    type: Schema.Types.ObjectId,
    ref: "Sorter"
  },
  study: {
    type: Schema.Types.ObjectId,
    ref: "Study"
  },
  trueUnits: {
    type: [{ type: Schema.Types.ObjectId, ref: "Unit" }]
  },
  accuracies: {
    type: [Number]
  },
  snrs: {
    type: [Number]
  },
  bestUnits: {
    type: [Number]
  },
  falseNegs: {
    type: [Number]
  },
  falsePoss: {
    type: [Number]
  }
});

module.exports = mongoose.model("SortingResult", sortingResultSchema);
