const mongoose = require("mongoose");
const SortingResult = mongoose.model("SortingResult"); //Singleton from mongoose

exports.getSortingResults = async (req, res) => {
  const sortingResultsPromise = SortingResult.find();
  const [sortingResults] = await Promise.all([sortingResultsPromise]);
  res.send({ sortingResults: sortingResults });
};

exports.getSortingResultById = async (req, res, next) => {
  const sortingResult = await SortingResult.findOne({ id: req.params.id });
  if (!sortingResult) {
    return next();
  }
  res.send({ sortingResult: sortingResult });
};
