import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../components/Layout";
import AuthorPost from "../pages/AuthorPost";
import AuthorAllPost from "../pages/AuthorAllPost";
const router = createBrowserRouter([
  {
    parh: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/create", element: <Create /> },
      { path: "/edit/:id", element: <Edit /> },
      { path: "/postDetail/:id", element: <PostDetail /> },
      {path: "/authorPost/:id", element: <AuthorPost />},
      {path: "/authorAllPost:id", element: <AuthorAllPost />}
    ],
  },
]);
export default router;
