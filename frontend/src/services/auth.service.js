import api from "./api";
const API_URL = import.meta.env.VITE_BASE_URL + "/auth";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const register = async (username, password) => {
  return await api.post(API_URL + "/register", { username, password });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });
  //save data to Cookies
  const { status, data } = response;
  console.log(response);
  if (status === 200) {
    if (data.accessToken) {
      cookies.set("accessToken", data.accessToken, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000), //expire date 24H
      });
      cookies.set("user", data);
    }
  }
  return response;
};

const logout = () => {
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("user", { path: "/" });
};

const AuthService = {
  register,
  login,
  logout,
};
export default AuthService;
