const mongoose = require("mongoose");
const SortingResult = mongoose.model("SortingResult"); //Singleton from mongoose
const TrueUnit = mongoose.model("TrueUnit");

exports.getSortingResults = async (req, res) => {
  const sortingResultsPromise = SortingResult.find();
  const [sortingResults] = await Promise.all([sortingResultsPromise]);
  res.send(sortingResults);
};

exports.getSortingResultById = async (req, res, next) => {
  const sortingResult = await SortingResult.findOne({ id: req.params.id });
  if (!sortingResult) {
    return next();
  }
  res.send({ sortingResult: sortingResult });
};

exports.getCPUs = async (req, res, next) => {
  const cpuPromise = await SortingResult.getCPUsByStudyAndSorter();
  const [cpuResults] = await Promise.all([cpuPromise]);
  res.send({ cpus: cpuResults });
};

exports.getStats = async (req, res, next) => {
  const [cpuPromise] = await SortingResult.getTotalCPU();
  const truePromise = await TrueUnit.countDocuments();
  res.send({ cpus: cpuPromise.cpuTimeSec, groundTruth: truePromise });
};
