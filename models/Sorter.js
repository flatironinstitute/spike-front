/* Example Sorter
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// {
//   _id: "511bde3e3985283f25000004",
//   "name": "IronClust-static",
//   "algorithm": "IronClust",
//   "processorName": "IronClust",
//   "processorVersion": "0",
//   "sorting_parameters": {
//     "detect_sign": -1,
//     "adjacency_radius": 50,
//     "prm_template_name": "static_template.prm",
//     "detect_threshold": 5
//   }
// }

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
