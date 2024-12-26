import { useState, useEffect } from "react";
import PostService from "../services/post.service";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import { format } from "date-fns";

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState(null);
  const { user } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Post",
      text: "Do you want to delete this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        PostService.deleteById(id);
        Swal.fire({
          title: "Delete Post",
          text: "Delete successfully",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          setPostDetail(response.data);
        }
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

  if (!postDetail) {
    return <div>Not found</div>;
  }

  return (
    <div className="max-w-4xl  items-center justify-center mx-auto bg-white shadow-md rounded-lg p-6 mt-8 w-5/6 ">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {postDetail.title}
        </h1>
        <div className="text-grey-600 mb-4">
          <time className=" block mb-2">
            {format(new Date(postDetail.createdAt), "dd MMMM yyyy HH:mm")}
          </time>
          <div className="author mb-2">
            <span className="font-semibold">
              BY <a className="text-sky-600"> @{postDetail.author.username}</a>
            </span>
          </div>
        </div>
        {user && user.id === postDetail.author._id && (
          <div className="mt-4 flex gap-2 justify-center">
            <a href={`/edit/${postDetail._id}`} className="btn btn-warning">
              Edit Post
            </a>
            <button
              onClick={() => handleDelete(postDetail._id)}
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {/* แสดงผล HTML content */}
      <div
        className="content text-gray-700 "
        dangerouslySetInnerHTML={{ __html: postDetail.content }}
      ></div>
    </div>
  );
};

export default PostDetail;
