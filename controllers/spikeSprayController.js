const mongoose = require("mongoose");
const SpikeSpray = mongoose.model("SpikeSpray"); //Singleton from mongoose

exports.getOneSpikeSpray = async (req, res, next) => {
  const spikeSpray = await SpikeSpray.findOne({ studyName: req.params.studyName, recordingName: req.params.recordingName, sorterName: req.params.sorterName, trueUnitId: req.params.trueUnitId, sortedUnitId: req.params.sortedUnitId });
  if (!spikeSpray) {
    return next();
  }
  res.send({ spikeSpray: spikeSpray });
};
