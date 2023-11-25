require("./database");
const express = require("express");
const path = require("path");

const app = express();
const userRoutes = require("./routes/user");
const userPostRoutes = require("./routes/post");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/", userRoutes);
app.use("/api/", userPostRoutes);

module.exports = app;
