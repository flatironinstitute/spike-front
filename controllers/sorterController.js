const data = require("../data");

exports.getSorters = async (req, res) => {
  res.send({ sorters: data.sorters });
};
