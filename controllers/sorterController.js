const mongoose = require("mongoose");
const Sorter = mongoose.model("Sorter");

exports.getSorters = async (req, res) => {
  const sortersPromise = Sorter.find();
  const [sorters] = await Promise.all([sortersPromise]);
  res.json({ sorters: sorters });
};

exports.getSorterById = async (req, res, next) => {
  const sorter = await Sorter.findOne({ id: req.params.id });
  if (!sorter) {
    return next();
  }
  res.json({ sorter: sorter });
};
