import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AdminLayoutAuth: React.FC = () => {
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
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          {/* Content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutAuth;
