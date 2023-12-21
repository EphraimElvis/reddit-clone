const { Post } = require("../models/index.js");

exports.create = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  //const postData = req.body;
  const post = {
    userId: req.userId,
  };
  if (req.file) {
    post.imageUrl = url + "/images/" + req.file.filename;
    post.text = req.body.text;
    post.description = req.body.description;
  } else {
    post.text = req.body.text;
    post.description = req.body.description;
  }
  Post.create(post)
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

exports.getAll = (req, res) => {
  Post.findAll()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deletePost = (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(201).json({ message: "Post deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteAll = (req, res) => {
  Post.destroy({
    truncate: true,
  })
    .then(() => {
      res.status(201).json({ message: "All Post deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.hasRead = (req, res) => {
  const postId = parseInt(req.params.postId);

  Post.findByPk(postId).then((post) => {
    if (!post) {
      return res.sendStatus(404);
    }
    post.hasUser(parseInt(req.params.userId)).then((hasRead) => {
      res.status(200).send({ hasRead });
    });
  });
};

exports.readPost = (req, res) => {
  const postId = parseInt(req.params.postId);
  const userId = parseInt(req.params.userId);
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        return res.sendStatus(404);
      }
      post
        .hasUser(userId)
        .then((hasRead) => {
          if (hasRead) {
            post.removeUser(userId);
          } else {
            post.addUser(userId);
          }
          res.sendStatus(201);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
