import { createBrowserRouter } from "react-router-dom";
import { UserRoutes } from "@/routes/UserRoutes";
import { AdminRoutes } from "@/routes/AdminRoutes";

const router = createBrowserRouter([...UserRoutes, ...AdminRoutes]);

export default router;
