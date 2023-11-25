const User = require("../models/User");
//const Post = require("../models/Post");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  });
};
