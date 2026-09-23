const data = require("../data");

exports.getStudyAnalysisResults = async (req, res) => {
  res.send({ studyAnalysisResults: data.studyAnalysisResults });
};

exports.getStudyAnalysisResultsForStudySet = async (req, res) => {
  let studySetName = req.params.studySetName;
  const studyAnalysisResults = data.studyAnalysisResults.filter(
    sar => sar.studySetName === studySetName
  );
  res.send({
    studyAnalysisResults: studyAnalysisResults,
    studySetName: studySetName
  });
};
