const Post = require("../models/Post");

exports.userpost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("field", url);
  const postData = req.body;
  Post.create({
    userId: req.userId,
    ...postData,
    imageUrl: url + "/images/" + req.file.filename,
  })
    .then(() => {
      res.status(201).json({
        message: "Post added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};
