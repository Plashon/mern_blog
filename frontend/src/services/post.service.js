import api from "./api"
const API_URL = import.meta.env.VITE_BASE_URL + "/post"

const createPost = async (post) =>{
    const response = await api.post(API_URL,post,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response;
}

const getAllPosts = async()=>{
    return await api.get(API_URL)
}

const getPostById = async(id)=>{
    return await api.get(`${API_URL}/${id}`)
}

const PostService = {
    createPost,
    getAllPosts,
    getPostById,
}

export default PostService;