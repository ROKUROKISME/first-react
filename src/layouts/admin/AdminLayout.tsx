import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/layouts/admin/Sidebar";
import Navbar from "@/layouts/admin/Navbar";
import Footer from "@/layouts/admin/Footer";

const AdminLayout: React.FC = () => {

  useEffect(() => {
    const scripts = [
      
      "/sneat/assets/vendor/libs/jquery/jquery.js",
      "/sneat/assets/vendor/libs/popper/popper.js",
      "/sneat/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
      "/sneat/assets/vendor/js/menu.js",
      // "/sneat/assets/vendor/js/bootstrap.js",
      "/sneat/assets/vendor/libs/apex-charts/apexcharts.js",
      "/sneat/assets/js/main.js",
      "/sneat/assets/js/dashboards-analytics.js",
    ];


    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    });

    return () => {
      scripts.forEach((src) => {
        const el = document.querySelector(`script[src="${src}"]`);
        if (el) el.remove();
      });
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://buttons.github.io/buttons.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Navbar />

          {/* Content wrapper */}
          <div className="content-wrapper">
            
            {/* Content */}
            <Outlet />
            {/* / Content */}

            <Footer />
            <div className="content-backdrop fade" />
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>
      <div className="layout-overlay layout-menu-toggle" />
    </div>
  );
};

export default AdminLayout;
