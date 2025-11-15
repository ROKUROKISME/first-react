import { createBrowserRouter } from "react-router-dom";
import { protectedLoader } from "@/loaders/protectedLoader";
import { restrictedLoader } from "@/loaders/restrictedLoader";

// Pages
import AdminLayout from "@/layouts/admin/AdminLayout";
import AdminLayoutAuth from "@/layouts/admin/AdminLayoutAuth";
import Login from "@/pages/Admin/Auth/Login";
import Home from "@/pages/Admin/Home";
import Users from "@/pages/Admin/Users/Index";
import UserCreate from "@/pages/Admin/Users/Create";
import UserEdit from "@/pages/Admin/Users/Edit";
import Category from "@/pages/Admin/Category/Index";
import CategoryCreate from "@/pages/Admin/Category/Create";
import CategoryEdit from "@/pages/Admin/Category/Edit";
import Post from "@/pages/Admin/Post/Index";
import PostCreate from "@/pages/Admin/Post/Create";
import PostEdit from "@/pages/Admin/Post/Edit";

const routerAdmin = createBrowserRouter([
  {
    path: "admin",
    element: <AdminLayoutAuth />,
    loader: restrictedLoader,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Login /> },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "users",
        children: [
          { index: true, element: <Users /> },
          { path: "create", element: <UserCreate /> },
          { path: ":id", element: <UserEdit /> },
        ],
      },
      {
        path: "category",
        children: [
          { index: true, element: <Category /> },
          { path: "create", element: <CategoryCreate /> },
          { path: ":id", element: <CategoryEdit /> },
        ],
      },
      {
        path: "post",
        children: [
          { index: true, element: <Post /> },
          { path: "create", element: <PostCreate /> },
          { path: ":id", element: <PostEdit /> },
        ],
      },
    ],
  },
]);

export default routerAdmin;
