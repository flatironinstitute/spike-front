const mongoose = require("mongoose");
const NewsPost = mongoose.model("NewsPost"); //Singleton from mongoose

exports.getNewsPosts = async (req, res) => {
  const newsPostsPromise = NewsPost.find();
  const [newsPosts] = await Promise.all([newsPostsPromise]);
  res.send({ newsPosts: newsPosts });
};
