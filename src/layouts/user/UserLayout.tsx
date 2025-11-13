import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/layouts/user/component/Navbar";
import Footer from "@/layouts/user/component/Footer";

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-gray-800 bg-white font-poppins">
      <Navbar />
      <main className="container flex-1 px-4 py-6 mx-auto mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
