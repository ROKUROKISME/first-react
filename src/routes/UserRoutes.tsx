// import { restrictedLoader } from "@/loaders/restrictedLoader";

import { createBrowserRouter } from "react-router-dom";
import UserLayout from "@/layouts/user/UserLayout";
import Home from "@/pages/User/Home";
import About from "@/pages/User/About";
import ReadPost from "@/pages/User/ReadPost";

const UserRoutes = createBrowserRouter([
  {
    path: "/",
    // loader: restrictedLoader,
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "home", element: <Home /> },
      { path: "read/:postId", element: <ReadPost /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default UserRoutes;
