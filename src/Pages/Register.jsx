import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const { registerwithemailandpassword, setUser, handlegooglesignin } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const file = photoUrl.files[0]
    const role = e.target.role.value
    

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;

    if (pass.length < 8) {
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least 8 characters.",
      });
    }
    if (!uppercase.test(pass)) {
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least one uppercase letter.",
      });
    }
    if (!lowercase.test(pass)) {
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least one lowercase letter.",
      });
    }
    if (!number.test(pass)) {
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least one number.",
      });
    }
    const form = new FormData();
    form.append("image", file);
    
    const res = await axios.post(
      "https://api.imgbb.com/1/upload?expiration=600&key=e0b53ef860f1e0c2b3d9621289c57042",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    const mainPhotoUrl = res.data.data.display_url;
    
    const formData = {
      email,
      pass,
      name,
      mainPhotoUrl,
      role,
    };
    

    registerwithemailandpassword(email, pass)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: mainPhotoUrl,
        })
          .then(() => {
            setUser(userCredential.user)
            axios.post('http://localhost:5000/users', formData)
              .then(res => {
                console.log(res.data)
              })
              .catch(err => {
                console.log(err)
              })

            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "Your account has been created successfully!",
              timer: 2000,
              showConfirmButton: false,
            });

            navigate(location.state?.from || "/");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: error.message || "Something went wrong!",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message || "Something went wrong!",
        });
      });
  };
  const googleSignUp = () => {
    handlegooglesignin()
      .then((result) => {
        setUser(result.user);

        Swal.fire({
          icon: "success",
          title: "Google Sign Up Successful",
          text: "You are now logged in!",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate(location.state?.from || "/Profile");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Google Sign Up Failed",
          text: error.message || "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photoUrl"
              type="file"
              className="input input-bordered"
              placeholder="Enter your photo URL"
            />
          </div>

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
          <select name="role" defaultValue="Choose Your Role" className="select">
            <option disabled={true}>Choose Your Role</option>
            <option role="donor">Donor</option>
            <option role="volunteer">Volunteer</option>
           
          </select>
          <button
            type="button"
            onClick={googleSignUp}
            className="btn justify-center btn-outline w-full gap-2"
          >
            <FcGoogle /> Google Sign Up
          </button>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/Login" className="link link-primary">
              Login
            </Link>
          </div>

          <button type="submit" className="btn btn-neutral w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
