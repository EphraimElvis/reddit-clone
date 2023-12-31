const { User, Post } = require("../models/index");

const jwt = require("jsonwebtoken");
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

exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not found!",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: new Error("Incorrect password"),
            });
          }
          const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24H",
          });
          res.status(200).json({
            userId: user.id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.profile = (req, res) => {
  const userId = parseInt(res.req.userId);
  //console.log("hello world", res.req.userId);
  User.findByPk(userId)
    .then((data) => {
      if (!data) {
        return res.sendStatus(404);
      }

      res.status(200).json({ data });
    })
    .catch((error) => error);
};

exports.deleteProfile = (req, res) => {
  const userId = parseInt(res.req.userId);

  User.destroy({
    where: {
      id: userId,
    },
    force: true,
  })
    .then(() => {
      res.status(200).json({ message: "User account deleted" });
    })
    .catch((error) => res.status(500).json(error));
};
