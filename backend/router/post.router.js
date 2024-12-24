const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const { upload } = require("../middleware/file.middleware");
const authJwt = require("../middleware/authJwt.middleware");

router.post("", authJwt.verifyToken, upload, postController.createPost);
router.get("", postController.getAllPosts);
// router.get("post/:id", authJwt.verifyToken,postController.getPostDetail)
router.get("/:id", postController.getPostById);
module.exports = router;
