const mongoose = require("mongoose");
const UnitResult = mongoose.model("UnitResult");
const Study = mongoose.model("Study");

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

function groupBy(list, keyGetter) {
  const map = {};
  list.forEach(item => {
    const key = keyGetter(item);
    if (!map[key]) {
      map[key] = [item];
    } else {
      map[key].push(item);
    }
  });
  return map;
}

exports.getGroupedUnitResults = async (req, res, next) => {
  const groupedURPromises = UnitResult.getAllUnitResultsByNestedStudySorter();
  const [groupedURs] = await Promise.all([groupedURPromises]);
  res.send({ groupedURs: groupedURs });
};

exports.getUnitResultsByStudy = async (req, res, next) => {
  const ursByStudy = await UnitResult.getUnitResultsByStudy({
    name: req.params.name
  });
  res.send({ ursByStudy: ursByStudy });
};

exports.getSpikeSprayById = async (req, res, next) => {
  const unitResult = await UnitResult.findOne({ id: req.params.id });
  if (!unitResult) {
    return next();
  }
  res.send({ unitResult: unitResult });
};
