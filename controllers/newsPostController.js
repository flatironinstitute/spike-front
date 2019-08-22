const mongoose = require("mongoose");
const NewsPost = mongoose.model("NewsPost"); //Singleton from mongoose

exports.getNewsPosts = async (req, res) => {
  const newsPostsPromise = NewsPost.find();
  let [newsPosts] = await Promise.all([newsPostsPromise]);
  newsPosts.sort((a, b) => {
    return b < a ? -1 : b > a ? 1 : 0;
  });
  res.send({ newsPosts: newsPosts });
};
