const mongoose = require("mongoose");
const UnitResult = mongoose.model("UnitResult"); //Singleton from mongoose

exports.getUnitResults = async (req, res) => {
  const unitResultPromise = UnitResult.find();
  const [unitResults] = await Promise.all([unitResultPromise]);
  res.send({ unitResults: unitResults });
};

exports.getUnitResultById = async (req, res, next) => {
  const unitResult = await UnitResult.findOne({ id: req.params.id });
  if (!unitResult) {
    return next();
  }
  res.send({ unitResult: unitResult });
};
