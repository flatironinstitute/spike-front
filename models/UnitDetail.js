const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
mongoose.Promise = global.Promise;

const unitDetailSchema = new mongoose.Schema(
  {
    studyName: {
      type: String,
      index: true
    },
    recordingName: {
      type: String,
    },
    sorterName: {
      type: String
    },
    trueUnitId: {
      type: Number,
    },  
    sortedUnitId: {
      type: Number,
    },  
    spikeSprayUrl: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model("UnitDetail", unitDetailSchema);
