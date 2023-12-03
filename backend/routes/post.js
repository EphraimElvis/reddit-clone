const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/posts", auth, multer, postCtrl.create);
router.get("/posts", auth, postCtrl.getAll);
router.delete("/posts/:id", auth, postCtrl.deletePost);
router.delete("/posts", auth, postCtrl.deleteAll);
router.get("/posts/:postId/:userId", auth, postCtrl.hasRead);
router.post("/posts/:postId/:userId", auth, postCtrl.readPost);

module.exports = router;
