const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const postController = require("../controllers/post");

router.post("/userpost", multer, postController.userpost);

module.exports = router;
