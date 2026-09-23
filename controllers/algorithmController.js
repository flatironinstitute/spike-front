const data = require("../data");

exports.getAlgorithms = async (req, res) => {
  res.send({ algorithms: data.algorithms });
};
