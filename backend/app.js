require("./database");
const express = require("express");
const path = require("path");

const app = express();
const userRoutes = require("./routes/user");
const userPostRoutes = require("./routes/post");
const getAllPostRoutes = require("./routes/post");
const deleteAllPostRoutes = require("./routes/post");
const deletePostRoutes = require("./routes/post");
const loginRoutes = require("./routes/user");
const hasReadRoutes = require("./routes/post");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/", userRoutes);
app.use("/api/", loginRoutes);
app.use("/api/", userPostRoutes);
app.use("/api/", deletePostRoutes);
app.use("/api/", getAllPostRoutes);
app.use("/app", deleteAllPostRoutes);

module.exports = app;
