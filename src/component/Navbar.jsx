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
    <div className="navbar bg-base-100 shadow-sm px-6">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/" className="lg:text-xl text-md font-bold">
          🩸 Red Love
        </Link>
      </div>

      {/* Center: Links */}
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal lg:gap-4 gap-1">
          <li>
            <Link to="/donation-requests">Donation Requests</Link>
          </li>

          {user && (
            <li>
              <Link to="/funding">Funding Links</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Right: Auth Section */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="text-error">
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
