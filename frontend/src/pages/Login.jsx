import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const [user,setUser]= useState({
    username:"",
    password:"",
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(user.username, user.password);
      console.log(currentUser.status);
      if (currentUser.status === 200) {
        Swal.fire({
          title: "User login",
          text: currentUser.data.message,
          icon: "success",
        });
      }
      setUser({username:"",password:""});
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "User login",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="card-title">Login</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button onClick={handleSubmit} className="btn bg-black text-white hover:bg-gray-800">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login