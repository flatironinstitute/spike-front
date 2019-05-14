const mongoose = require("mongoose");
const UnitDetail = mongoose.model("UnitDetail"); //Singleton from mongoose

exports.getUnitDetail = async (req, res) => {
  const unitDetail = await UnitDetail.findOne({
        studyName: req.params.studyName,
        recordingName: req.params.recordingName,
        sorterName: req.params.sorterName,
        trueUnitId: req.params.trueUnitId
    });
  if (!unitDetail) {
    return next();
  }
  res.send({ unitDetail: unitDetail });
};

