import React, { useContext } from "react";
import Navprofile from "./Navprofile";
import { useUserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useUserContext();
  console.log(logout);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Do you want to logout",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Logout",
          text: "Logout successfully",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="navbar bg-slate-400 shadow-md w-full h-1">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-lg">
          MERN-SE
        </a>
      </div>
      {user ? (
        <div className="navbar-end gap-2">
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a  className="btn-outline" >create</a>
              </li>
              <li>
                <a className=" btn-outline" onClick={handleLogout}>logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-2">
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a  className="btn-outline outline-1" href="/login">login</a>
              </li>
              <li>
                <a  className="btn-outline outline-1" href="/register">register</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
