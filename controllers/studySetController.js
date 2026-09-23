const data = require("../data");

const sortedStudySets = [...data.studySets].sort((a, b) => {
  let textA = a.name.toUpperCase();
  let textB = b.name.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
});

exports.getStudySets = async (req, res) => {
  res.send(sortedStudySets);
};
