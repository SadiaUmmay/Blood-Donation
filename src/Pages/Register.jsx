import React, { useContext, useEffect, useState } from "react";
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

  const [upozillas, setUpozillas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upozilla, setUpozilla] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/Upozilla.json").then((res) => setUpozillas(res.data.upazilas));
    axios.get("/District.json").then((res) => setDistricts(res.data.districts));

    axios
      .get("https://blooddonation-nu.vercel.app/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const file = photoUrl.files[0];
    const blood = e.target.blood.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;

    if (
      pass.length < 8 ||
      !uppercase.test(pass) ||
      !lowercase.test(pass) ||
      !number.test(pass)
    ) {
      setLoading(false);
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 8 characters, include uppercase, lowercase and number.",
      });
    }

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=e0b53ef860f1e0c2b3d9621289c57042",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const mainPhotoUrl = res.data.data.display_url;

      const formData = {
        email,
        pass,
        name,
        mainPhotoUrl,
        blood,
        district,
        upozilla,
        role: "donor",
        status: "active",
        createdAt: new Date(),
      };

      // Register in Firebase
      const userCredential = await registerwithemailandpassword(email, pass);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: mainPhotoUrl,
      });
      setUser(userCredential.user);

      const { data: newUser } = await axios.post(
        "https://blooddonation-nu.vercel.app/users",
        formData
      );
      setUsers((prev) => [...prev, newUser]);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location.state?.from || "/");
      setTimeout(()=>{
        window.location.reload();
      },500)
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const googleSignUp = async () => {
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

      const { data: newUser } = await axios.post(
        "https://blooddonation-nu.vercel.app/users",
        formData
      );
      setUsers((prev) => [...prev, newUser]);

      Swal.fire({
        icon: "success",
        title: "Google Sign Up Successful",
        text: "You are now logged in!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location.state?.from || "/");
      setTimeout(()=>{
        window.location.reload();
      },500)
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Google Sign Up Failed",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>

        {loading && <p className="text-center mb-2">Loading...</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered"
            required
          />
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered"
            required
          />
          <input name="photoUrl" type="file" className="input input-bordered" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered"
            required
          />

          <select name="blood" className="select" defaultValue="">
            <option disabled value="">
              Choose Blood Group
            </option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select"
          >
            <option disabled value="">
              Select Your District
            </option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={upozilla}
            onChange={(e) => setUpozilla(e.target.value)}
            className="select"
          >
            <option disabled value="">
              Select Your Upazila
            </option>
            {upozillas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={googleSignUp}
            className="btn justify-center btn-outline w-full gap-2"
          >
            <FcGoogle /> Google Sign Up
          </button>
          <div className="text-sm text-center mt-2">
            Already have an account?
            <Link to="/Login" className="link link-primary text-center block">
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