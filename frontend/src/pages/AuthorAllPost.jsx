import { useEffect, useState } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import Post from "../components/Post";
import { useParams } from "react-router";

const AuthorAllPost = () => {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await PostService.getPostByUserId(id);
          if (response.status === 200) {
            setPosts(response.data);
          }
        } catch (error) {
          Swal.fire({
            title: "Home",
            text: error?.response?.data?.message || error.message,
            icon: "error",
          });
        }
      };
      fetchPost();
    }, []);
  return (
    <div className="justify-center items-center">
      <div className="">
        {posts.length > 0 &&
          posts.map((post, index) => {
            return <Post key={index} {...post} />;
          })}
      </div>
    </div>
  );
}

export default AuthorAllPost