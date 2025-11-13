import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AdminRoutes from "@/routes/AdminRoutes";
import { AlertProvider } from "@/context/AlertContext";

function loadSneatAssets() {
  const cssFiles = [
    "/sneat/assets/vendor/css/core.css",
    "/sneat/assets/vendor/css/theme-default.css",
    "/sneat/assets/css/demo.css",
    "/sneat/assets/vendor/css/pages/page-auth.css",
    "/sneat/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css",
    "/sneat/assets/vendor/fonts/boxicons.css",
  ];

  const jsFiles = [
    "/sneat/assets/vendor/js/helpers.js",
    "/sneat/assets/js/config.js",

    "/sneat/assets/vendor/css/core.css",
    "/sneat/assets/vendor/css/theme-default.css",
    "/sneat/assets/css/demo.css",
    "/sneat/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css",
    "/sneat/assets/vendor/fonts/boxicons.css",
  ];

  cssFiles.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });

  jsFiles.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  });

  // Load JS secara berurutan (agar helpers → config → bootstrap → main)
  jsFiles.reduce((prev, src) => {
    return prev.then(() => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    });
  }, Promise.resolve());
}

loadSneatAssets();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertProvider>
      <RouterProvider router={AdminRoutes} />
    </AlertProvider>
  </React.StrictMode>
);
