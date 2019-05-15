const mongoose = require("mongoose");
const UnitDetail = mongoose.model("UnitDetail"); //Singleton from mongoose
const axios = require("axios");

exports.getUnitDetail = async (req, res, next) => {
  const unitDetail = await UnitDetail.findOne({
        studyName: req.params.studyName,
        recordingName: req.params.recordingName,
        sorterName: req.params.sorterName,
        trueUnitId: req.params.trueUnitId
    });
  if (!unitDetail) {
    res.send({ unitDetail: {
      studyName: req.params.studyName,
      recordingName: req.params.recordingName,
      sorterName: req.params.sorterName,
      trueUnitId: req.params.trueUnitId
    } });  
    return;
  }
  let unitDetail2 = JSON.parse(JSON.stringify(unitDetail));
  if ((unitDetail2.spikeSprayUrl) && (!unitDetail2.spikeSprayData)) {
    let response = await axios.get(unitDetail2.spikeSprayUrl);
    const returned = await response.data;
    if (response.status !== 200) {
      console.log(`Error retrieving spike spray data from ${unitDetail2.spikeSprayUrl}`);
      console.error(returned.message);
    }
    else {
      unitDetail2.spikeSprayData = returned;
    }
  }
  res.send({ unitDetail: unitDetail2 });
};

