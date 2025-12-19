import React, { useState, useContext } from "react";
// import {   useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { setUser, handlegooglesignin } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  // const location = useLocation();
  const navigate = useNavigate();

  // Email / Password Login 
  const handlesubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        setUser(userCredential.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You are now logged in!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  // google sign in 
  const googlesignin = () => {
    handlegooglesignin()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Signed in with Google",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Google Sign In Failed",
          text: error.message,
        })
      );
  };

 

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>

        <form onSubmit={handlesubmit} className="space-y-4">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button className="btn btn-neutral w-full mt-2">Login</button>

          {/* Register Redirect */}
          <div className="text-sm text-center mt-2">
            Don’t have an account?
            <Link to="/signup" className="link link-primary ml-1">
              Register
            </Link>
          </div>

         
          
          {/* Google Login */}
          <button
            type="button"
            onClick={googlesignin}
            className="btn justify-center btn-outline w-full gap-2"
          >
            <FcGoogle /> Google Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
