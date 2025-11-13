import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import LogoReact from "@/assets/react.svg"
import { BiChevronRight } from "react-icons/bi";

const navbar = [
  {
    title: 'Home',
    path: '/',
    active: 'home'
  },
  {
    title: 'About',
    path: '/about',
    active: 'about'
  },
  {
    title: 'Contact',
    path: '/contact',
    active: 'contact'
  }
]

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 z-50 flex justify-center w-full h-16 bg-blue-300 border border-gray-100 shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700 ">
          <img
            src={LogoReact}
            alt="logo-react"
            className="mr-1 w-12 animate-spin [animation-duration:5s]"
          />
          <span>Noyan's Post</span>
        </Link>
        {/* Menu */}
        <div className="flex items-center justify-center space-x-6">
          {navbar.map((item) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }>
              {item.title}
            </NavLink>
          ))}
          <div className="relative group">
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                <span>News</span>
                <BiChevronRight
                  className={`ml-1 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
              </button>
              {isOpen && (
                <ul className="absolute left-0 w-48 pb-2 mt-1 space-y-1 transition-transform duration-150 ease-in-out bg-white rounded-md shadow-lg">
                  <li className="w-full px-2 my-2 hover:text-blue-600">Hot</li>
                  <li className="w-full px-2 my-2 hover:text-blue-600">
                    Trending
                  </li>
                  <li className="w-full px-2 my-2 hover:text-blue-600">
                    Most View
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;