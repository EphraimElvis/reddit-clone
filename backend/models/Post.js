const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Post = sequelize.define("post", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Post;
