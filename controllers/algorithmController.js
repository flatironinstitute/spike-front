const mongoose = require("mongoose");
const Algorithm = mongoose.model("Algorithm");

exports.getAlgorithms = async (req, res) => {
  const algorithmsPromise = await Algorithm.findOne({ id: "" });
  const [algorithms] = await Promise.all([algorithmsPromise]);
  console.log("🐻🐻", algorithms);
  res.send({ algorithms: algorithms });
};

exports.getAlgorithmById = async (req, res, next) => {
  const algorithm = await Algorithm.findOne({ id: req.params.id });
  if (!algorithm) {
    return next();
  }
  res.send({ algorithm: algorithm });
};
