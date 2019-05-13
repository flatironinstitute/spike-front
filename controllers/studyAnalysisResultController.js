const mongoose = require("mongoose");
const StudyAnalysisResult = mongoose.model("StudyAnalysisResult"); //Singleton from mongoose

exports.getStudyAnalysisResults = async (req, res) => {
  const studyAnalysisResultsPromise = StudyAnalysisResult.find();
  const [studyAnalysisResults] = await Promise.all([studyAnalysisResultsPromise]);
  res.send({ studyAnalysisResults: studyAnalysisResults });
};

