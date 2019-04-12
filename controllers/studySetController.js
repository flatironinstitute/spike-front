const mongoose = require("mongoose");
const StudySet = mongoose.model("StudySet"); //Singleton from mongoose

exports.getStudySets = async (req, res) => {
  const studySetsPromise = StudySet.find();
  const [studySets] = await Promise.all([studySetsPromise]);
  res.send(studySets);
};

exports.getStudySetById = async (req, res, next) => {
  const studySet = await StudySet.findOne({ id: req.params.id });
  if (!studySet) {
    return next();
  }
  res.send({ studySet: studySet });
};
