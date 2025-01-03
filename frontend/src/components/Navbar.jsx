import { useUserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

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
        }).then(() => {
          navigate("/");
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
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost text-lg">
          Home Page
        </a>
      </div>
      {user ? (
        <div className="navbar-end gap-2">
          <div className="flex-none ">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li
                className="tooltip tooltip-bottom"
                data-tip="View your all post"
              >
                <a
                  className="btn btn-outline hover:btn-info btn-circle avatar"
                  href={`/authorPost/${user.id}`}
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </a>
              </li>
              <li>
                <a className="btn btn-outline hover:btn-accent" href="/create">
                  create new post
                </a>
              </li>
              <li>
                <a
                  className="btn btn-outline hover:btn-error"
                  onClick={handleLogout}
                >
                  ({user.username})logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-2">
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <a className="btn btn-outline outline-1" href="/login">
                  login
                </a>
              </li>
              <li>
                <a className="btn btn-outline outline-1" href="/register">
                  register
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
