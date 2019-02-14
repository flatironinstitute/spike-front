const mongoose = require("mongoose");
const Unit = mongoose.model("Unit"); //Singleton from mongoose

exports.getUnits = async (req, res) => {
  const unitsPromise = Study.find();
  const [units] = await Promise.all([unitsPromise]);
  //   TODO: Replace with kbucket calls
  res.json({ units: units });
};

exports.getUnitById = async (req, res, next) => {
  const unit = await Study.findOne({ id: req.params.id });
  //   TODO: Replace with kbucket calls
  if (!unit) {
    return next();
  }
  res.json({ unit: unit });
};
