const mongoose = require("mongoose");
const TrueUnit = mongoose.model("TrueUnit"); //Singleton from mongoose

exports.getTrueUnits = async (req, res) => {
  const trueUnitsPromise = TrueUnit.find();
  const [trueUnits] = await Promise.all([trueUnitsPromise]);
  res.send({ trueUnits: trueUnits });
};

exports.getTrueUnitById = async (req, res, next) => {
  const trueUnit = await TrueUnit.findOne({ id: req.params.id });
  if (!trueUnit) {
    return next();
  }
  res.send({ trueUnit: trueUnit });
};
