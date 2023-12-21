const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Post = sequelize.define("post", {
  text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Post;
