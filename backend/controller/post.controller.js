const { response } = require("express");
const PostModel = require("../model/Post");
const jwt = require("jsonwebtoken");
const { post } = require("../router/user.router");
require("dotenv").config();

exports.createPost = async (req, res) => {
  //file upload
  const { path: cover } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
  try {
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All fields is require" });
    }
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover,
      author,
    });
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while creating a new post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({
        createdAt: -1,
      })
      .limit(10);
    res.json(posts);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while getting all posts",
    });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params; // Assuming _id is passed as a route parameter
  try {
    const postDetail = await PostModel.findById(id).populate("author", [
      "username",
    ]);
    if (!postDetail) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(postDetail);
  } catch (error) {
    console.log(error.message);

    res.status(500).send({
      message: "Something error occurred while getting post detail",
    });
  }
};

exports.deletePostById = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (authorId !== postDoc.author._id.toString()) {
      return res.status(403).json({ message: "You cannot delete this post" });
    }
    await PostModel.deleteOne();
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while deleting a post",
    });
  }
};

exports.updatePostById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Post id is not provided" });
  }
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (authorId !== postDoc.author._id.toString()) {
      return res.status(403).json({ message: "You cannot update this post" });
    }
    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (req.file) {
      const { path: cover } = req.file;
      postDoc.cover = cover;
    }
    await postDoc.save();
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error occurred while updating a post",
    });
  }
};
