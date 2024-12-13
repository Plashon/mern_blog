import axios from "axios"
const baseURL = import.meta.VITE_BASE_URL
const instance = axios.create({
    baseURL :baseURL,
    headers:{
        "Content-Type":"application/json"
    }
})

export default instance;