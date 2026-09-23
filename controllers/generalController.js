const data = require("../data");

exports.getGeneral = async (req, res) => {
  res.send({ general: data.general[0] || {} });
};
