import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import PostService from "./../services/post.service";
import Editor from "../components/Editor";
import { useUserContext } from "../contexts/UserContext";

const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const { user } = useUserContext();
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Access Denied",
        text: "You must be logged in to access this page.",
        icon: "warning",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPostDetail({ ...postDetail, content: content });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);
      const response = await PostService.createPost(data);
      console.log("Response Data:", response);
      if (response.status === 200) {
        Swal.fire({
          title: "Create new post",
          text: response.data.message,
          icon: "success",
        }).then(() => {
          setPostDetail({
            title: "",
            summary: "",
            content: "",
            file: null,
          });
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Create new post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen max-h-fit w-5/6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/6 max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Create Post</h1>
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={postDetail.title}
              onChange={handleChange}
              className="input input-bordered w-full truncate"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="summary"
            >
              Summary
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={postDetail.summary}
              onChange={handleChange}
              className="input input-bordered w-full truncate"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <div className="h-32">
              <Editor
                value={content}
                onChange={handleContentChange}
                ref={editorRef}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              id="image"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn btn-primary w-full"
              onClick={handleSubmit}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
