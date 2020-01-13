const mongoose = require("mongoose");
const Algorithm = mongoose.model("Algorithm");

exports.getAlgorithms = async (req, res) => {
  const algorithmsPromise = await Algorithm.findOne({ id: "" });
  const [algorithms] = await Promise.all([algorithmsPromise]);
  // res.send({ algorithms: algorithms });
  res.status(401);
  res.json({ message: "I am an error" });
};

exports.getAlgorithmById = async (req, res, next) => {
  const algorithm = await Algorithm.findOne({ id: req.params.id });
  if (!algorithm) {
    return next();
  }
  res.send({ algorithm: algorithm });
};
