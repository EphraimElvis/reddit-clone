const Post = require("./Post");
const User = require("./User");

User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User);
Post.belongsToMany(User, { through: "userReadPost" });
User.belongsToMany(Post, { through: "userReadPost" });

module.exports = { Post, User };
