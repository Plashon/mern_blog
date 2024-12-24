import { useState, useEffect } from "react";
import PostService from "../services/post.service";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { useUserContext } from "../contexts/UserContext";

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState(null);
  const { user } = useUserContext();
  const { id } = useParams();
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
        });
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div className="max-w-4xl  items-center justify-center mx-auto bg-white shadow-md rounded-lg p-6 mt-8 w-5/6 ">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {postDetail?.title}
        </h1>
        <p className="text-sm text-gray-500 text-center">
          {new Date(postDetail?.createdAt).toLocaleString()}{" "}
        </p>
        <span className="font-semibold">
          BY <a className="text-sky-600"> @{postDetail?.author.username}</a>
        </span>
       {user && user.id === postDetail?.author._id && (
          <div className="mt-4">
            <a
              href={`/edit/${postDetail?._id}`}
              className="bg-slate-700 text-white  py-2 px-4 rounded"
            >
              Edit Post
            </a>
          </div>
        )}
      </div>
      {/* แสดงผล HTML content */}
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: postDetail?.content }}
      ></div>
    </div>
  );
};

export default PostDetail;
