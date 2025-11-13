import { createBrowserRouter } from "react-router-dom";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";

const router = createBrowserRouter([...UserRoutes, ...AdminRoutes]);

export default router;
