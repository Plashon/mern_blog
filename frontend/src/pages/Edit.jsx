import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import PostService from "./../services/post.service";
import Editor from "../components/Editor";
import Swal from "sweetalert2";

const Edit = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const { id } = useParams();
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        const post = response.data;
        setPostDetail({
          title: post.title,
          summary: post.summary,
          content: post.content,
          file: post.cover,
        });
        setContent(post.content);
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        }).then(() => {
          navigate("/");
        });
      }
    };
    fetchPost();
  }, [id]);

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
    setPostDetail((prevDetail) => ({ ...prevDetail, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", content);
      if (postDetail.file) {
        data.set("file", postDetail.file);
      }
      const response = await PostService.updatePost(id, data);
      if (response.status === 200) {
        Swal.fire({
          title: "Update Post",
          text: "Post updated successfully.",
          icon: "success",
        }).then(() => {
          navigate(`/`);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  if (!postDetail) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen max-h-fit w-5/6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/6 max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Post</h1>
        <form onSubmit={handleSubmit}>
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
                value={postDetail.content || ""}
                ref={editorRef}
                onChange={handleContentChange}
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
            />
            
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => navigate("/")}
            >
              Cancel Update
            </button>
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
