const mongoose = require("mongoose");
const Sorter = mongoose.model("Sorter"); //Singleton from mongoose

exports.getSorters = async (req, res) => {
  const sortersPromise = Sorter.find();
  const [sorters] = await Promise.all([sortersPromise]);
  //   TODO: Replace with kbucket calls
  res.json({ sorters: sorters });
};

exports.getSorterById = async (req, res, next) => {
  const sorter = await Sorter.findOne({ id: req.params.id });
  //   TODO: Replace with kbucket calls
  if (!sorter) {
    return next();
  }
  res.json({ sorter: sorter });
};
