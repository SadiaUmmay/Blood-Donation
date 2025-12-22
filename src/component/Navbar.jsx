import React, { useContext } from "react";

import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const { user, handlesignout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    handlesignout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="navbar bg-white shadow-lg border-b border-gray-100 px-2 md:px-6">
      {/* Left: Logo - Enhanced */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 bg-linear-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-lg">🩸</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <span className="lg:text-xl text-md font-bold text-gray-800">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Red Love
            </span>
          </span>
        </Link>
      </div>

      {/* Center: Links - Enhanced */}
      <div className="navbar-center flex">
        <ul className="flex items-center space-x-1">
          <li>
            <Link
              to="/donation-requests"
              className="px-1 md:px-4 py-2 rounded-lg text-gray-700 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 font-medium"
            >
              Donation Requests
            </Link>
          </li>

          {user && (
            <li>
              <Link
                to="/funding"
                className="px-1 md:px-4 py-2 rounded-lg text-gray-700 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 font-medium"
              >
                Funding Links
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Right: Auth Section - Enhanced */}
      <div className="navbar-end">
        {!user ? (
          <Link
            to="/login"
            className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-medium text-sm"
          >
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="relative group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-500 ring-offset-2 ring-offset-white group-hover:ring-red-600 transition-all duration-300">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-1 md:p-4 shadow-xl bg-white rounded-xl w-56 mt-3 border border-gray-100"
            >
              <li className="mb-2">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="font-medium text-gray-800">Welcome back!</p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || user.displayName}
                  </p>
                </div>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="px-1 py-2.5 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-700 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  onClick={handleSignOut}
                  className="px-1 py-2.5 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors duration-200 text-left w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
