const mongoose = require("mongoose");
const StudySet = mongoose.model("StudySet"); //Singleton from mongoose

exports.getStudySets = async (req, res) => {
  const studySetsPromise = StudySet.find();
  let [studySets] = await Promise.all([studySetsPromise]);
  studySets.sort((a, b) => {
    let textA = a.name.toUpperCase();
    let textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  res.send(studySets);
};

exports.getStudySetById = async (req, res, next) => {
  const studySet = await StudySet.findOne({ id: req.params.id });
  if (!studySet) {
    return next();
  }
  res.send({ studySet: studySet });
};
