const mongoose = require("mongoose");
const Result = mongoose.model("SortingResult"); //Singleton from mongoose

exports.getSortingResultsByStudySorter = async (req, res) => {
  const sortersPromise = Sorter.find();
  const [sorters] = await Promise.all([sortersPromise]);
  //   TODO: Replace with kbucket calls
  res.json({ sorters: sorters });
};

exports.getSortingResultsByStudySorter = async (req, res, next) => {
  let studyId = req.params.studyId;
  let sorterId = req.param.sorterId;
  const results = await Result.find({ study: studyId, sorter: sorterId });
  //   TODO: Replace with kbucket calls
  if (!result) {
    return next();
  }
  res.json({ sortingResults: results });
};
