// ini default
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

// ini kurang cocok karena hanya akan sering 404 not found karena render halaman dulu
// if (window.location.pathname.startsWith("/admin")) {
//   import("./admin/main-admin");
// } else {
//   import("./user/main-user");
// }

// ini modifikasi sehingga seperti Middleware membuat halaman lebih dan tidak 404 karena render route setelah pengecekan
import { isAuthenticated } from "@/utils/auth";
import { getUserRole } from "@/utils/getToken";

// Jika sudah login
if (isAuthenticated()) {
  const role = getUserRole();

  // Admin Role
  if (role === "Admin" || role === "SuperAdmin") {
    // Jika user berada di route user ("/")
    if (!window.location.pathname.startsWith("/admin")) {
      window.location.replace("/admin");
      // STOP agar tidak load user app
      throw new Error("Redirecting...");
    }
    // Sudah di /admin → load admin app
    import("./admin/main-admin");
  }

  // User role
  else {
    // Jika user berada di route admin
    if (window.location.pathname.startsWith("/admin")) {
      window.location.replace("/");
      throw new Error("Redirecting...");
    }

    import("./user/main-user");
  }
} else {
  // Belum login
  if (window.location.pathname.startsWith("/admin")) {
    import("./admin/main-admin");
  } else {
    import("./user/main-user");
  }
}
