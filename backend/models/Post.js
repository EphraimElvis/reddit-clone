const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Post = sequelize.define("user", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

exports.module = Post;
