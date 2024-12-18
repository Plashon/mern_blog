import axios from "axios"
import TokenService from "./token.service"
const baseURL = import.meta.VITE_BASE_URL
const instance = axios.create({
    baseURL :baseURL,
    headers:{
        "Content-Type":"application/json"
    }
})

instance.interceptors.request.use((config)=>{
    const token = TokenService.getLocalAccessToken;
    console.log(token);
    
    if(token){
        config.headers["x-access-token"] = token
    }
    return config;
})

export default instance;