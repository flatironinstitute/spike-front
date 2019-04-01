const mongoose = require("mongoose");
const Study = mongoose.model("Study"); //Singleton from mongoose

exports.getStudies = async (req, res) => {
  const studiesPromise = Study.find();
  const [studies] = await Promise.all([studiesPromise]);
  res.send({ studies: studies });
};

exports.getStudyById = async (req, res, next) => {
  const study = await Study.findOne({ id: req.params.id });
  if (!study) {
    return next();
  }
  res.send({ study: study });
};
