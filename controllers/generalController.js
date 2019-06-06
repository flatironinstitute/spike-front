const mongoose = require("mongoose");
const General = mongoose.model("General"); //Singleton from mongoose

exports.getGeneral = async (req, res) => {
  const generalPromise = General.find();
  const [general] = await Promise.all([generalPromise]);
  res.send({ general: general[0] || {} });
};
