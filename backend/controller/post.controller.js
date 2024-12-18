const PostModel = require("../model/Post")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const key = process.env.KEY_PASS

exports.createPost = async (req,res) =>{
    const token = req.headers["x-access-token"]
}