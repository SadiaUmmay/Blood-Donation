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

      await axios.post("https://blooddonation-nu.vercel.app/users", formData);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
    <div className="relative w-full max-w-md">
      {/* Background decorative elements */}
      <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 via-pink-600/10 to-orange-600/10 dark:from-red-900/20 dark:via-pink-900/20 dark:to-orange-900/20 rounded-3xl blur-xl"></div>
      
      {/* Floating blood drops */}
      <div className="absolute -top-8 -right-8 w-16 h-20 bg-red-500/10 dark:bg-red-600/20 rounded-full rotate-45 blur-sm"></div>
      <div className="absolute -bottom-8 -left-8 w-12 h-16 bg-red-500/10 dark:bg-red-600/20 rounded-full -rotate-12 blur-sm"></div>
  
      <div className="relative card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-full shadow-2xl p-8 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
        
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🩸</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to continue saving lives</p>
        </div>
  
        {/* Loading Indicator */}
        {loading && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span>Authenticating...</span>
            </div>
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89-5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                name="email"
                type="email"
                className="pl-10 input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 transition-all duration-300 rounded-xl h-12"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
  
          {/* Password Input */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                name="password"
                type="password"
                className="pl-10 input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 transition-all duration-300 rounded-xl h-12"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="label mt-2">
              <a href="#" className="label-text-alt link link-hover text-red-600 dark:text-red-400">
                Forgot password?
              </a>
            </div>
          </div>
  
          {/* Login Button */}
          <button 
            type="submit" 
            className="group relative w-full h-12 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            disabled={loading}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
  
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
  
          {/* Google Login */}
          <button
            type="button"
            onClick={googleSignIn}
            disabled={loading}
            className="group w-full h-12 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>
  
          {/* Register Redirect */}
          <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200">
                Join as a Donor
              </Link>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              By signing in, you agree to help save lives
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;