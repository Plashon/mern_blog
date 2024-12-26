const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const { upload } = require("../middleware/file.middleware");
const authJwt = require("../middleware/authJwt.middleware");

router.post("", authJwt.verifyToken, upload, postController.createPost);
router.get("", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.delete("/:id", authJwt.verifyToken, postController.deletePostById);
router.put("/:id", authJwt.verifyToken, upload, postController.updatePostById);
module.exports = router;
