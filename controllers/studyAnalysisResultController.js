const mongoose = require("mongoose");
const StudyAnalysisResult = mongoose.model("StudyAnalysisResult"); //Singleton from mongoose

exports.getStudyAnalysisResults = async (req, res) => {
  const studyAnalysisResultsPromise = StudyAnalysisResult.find();
  const [studyAnalysisResults] = await Promise.all([
    studyAnalysisResultsPromise
  ]);
  res.send({ studyAnalysisResults: studyAnalysisResults });
};

exports.getStudyAnalysisResultsForStudySet = async (req, res) => {
  let studySetName = req.params.studySetName;
  const studyAnalysisResultsForStudySetPromise = StudyAnalysisResult.find({
    studySetName: { $eq: studySetName }
  });
  const [studyAnalysisResults] = await Promise.all([
    studyAnalysisResultsForStudySetPromise
  ]);
  res.send({
    studyAnalysisResults: studyAnalysisResults,
    studySetName: studySetName
  });
};
