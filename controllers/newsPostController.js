const data = require("../data");

// newest first
const sortedNewsPosts = [...data.newsPosts].sort((a, b) =>
  b.date < a.date ? -1 : b.date > a.date ? 1 : 0
);

exports.getNewsPosts = async (req, res) => {
  res.send({ newsPosts: sortedNewsPosts });
};
