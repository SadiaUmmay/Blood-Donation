import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const { setUser, handlegooglesignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Email / Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const pass = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      setUser(userCredential.user);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Google SignIn
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await handlegooglesignin();
      const user = result.user;
      setUser(user);

      const formData = {
        email: user.email,
        name: user.displayName,
        mainPhotoUrl: user.photoURL,
        role: "donor",
        status: "active",
        createdAt: new Date(),
      };

      await axios.post("http://localhost:5000/users", formData);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Signed in with Google",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Google Sign In Failed",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>

        {loading && <p className="text-center mb-2">Loading...</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="btn btn-neutral w-full mt-2">
            Login
          </button>

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
            onClick={googleSignIn}
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