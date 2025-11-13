// import React from "react";
// import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import router from "@/routes/UserRoutes";
// import "@/index.css";


// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// if (window.location.pathname.startsWith("/admin")) {
//   import("@/admin/main-admin");
// } else {
//   import("@/user/main-user");
// }

if (window.location.pathname.startsWith("/admin")) {
  console.log("Loading admin app...");
  import("./admin/main-admin");
} else {
  console.log("Loading user app...");
  
  import("./user/main-user");
}
