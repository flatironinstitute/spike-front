const mongoose = require("mongoose");
const Recording = mongoose.model("Recording"); //Singleton from mongoose

exports.getRecordings = async (req, res) => {
  const recordingsPromise = Recording.find();
  // const recordingsPromise = Recording.getRecordingsByStudy();
  const [recordings] = await Promise.all([recordingsPromise]);
  res.send(recordings);
};

exports.getRecordingById = async (req, res, next) => {
  const recording = await Recording.findOne({ id: req.params.id });
  if (!recording) {
    return next();
  }
  res.send({ recording: recording });
};
