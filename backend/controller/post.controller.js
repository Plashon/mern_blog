const { response } = require("express");
const PostModel = require("../model/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createPost = async (req, res) => {
  //file upload
  const { path: cover } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
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
};

exports.getAllPosts = async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", ["username"])
    .sort({
      createdAt: -1,
    })
    .limit(10);

  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const { id } = req.params; // Assuming _id is passed as a route parameter
  const postDetail = await PostModel.findById(id).populate("author", [
    "username",
  ]);
  res.json(postDetail);
};
