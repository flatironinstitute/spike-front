const mongoose = require("mongoose");
const UnitResult = mongoose.model("UnitResult"); //Singleton from mongoose

exports.getUnitResults = async (req, res) => {
  const unitResultsPromise = UnitResult.find();
  const [unitResults] = await Promise.all([unitResultsPromise]);
  res.send({ unitResults: unitResults });
};

exports.getUnitResultById = async (req, res, next) => {
  const unitResult = await UnitResult.findOne({ id: req.params.id });
  if (!unitResult) {
    return next();
  }
  res.send({ unitResult: unitResult });
};

exports.getGroupedUnitResults = async (req, res, next) => {
  const groupedURPromise = await UnitResult.getUnitResultsByStudyAndSorter();
  const [groupedURs] = await Promise.all([groupedURPromise]);
  res.send({ groupedURs: groupedURs });
};
