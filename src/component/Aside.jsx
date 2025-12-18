import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

const Aside = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const { role , loading } = useContext(AuthContext)
  if (loading) return null;

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/role/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);
  if (!profile) return <p className="p-10 text-center">Loading...</p>;

  const handlesignout = ()=>{
    signOut(auth)
  }

  return (
    <aside className="w-64 min-h-screen bg-base-200 border-r p-5 ">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 mb-8">
        {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={profile.mainPhotoUrl || user.photoURL}
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />
        {/* name and email  */}
      </div>
        <h3 className="font-semibold text-lg">{profile?.name || user?.displayName}</h3>
        <p className="text-sm text-gray-500">{profile?.email || user?.displayName}</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">

        {/* dashboard  */}
        <Link to={"/dashboard"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
          Dashboard
        </Link>

        {/* my profile  */}
        <Link to={"profiledash"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
          My Profile
        </Link>

        {/* donation request  */}
        {
          role == 'donor' && (
            <Link to={"donationrequest"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
              My Donation Requests
            </Link>
          )
        }
        {/* create donation request  */}
        {
          role =='donor' && (
          <NavLink to={"createdonation"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
            Create Donation Request
          </NavLink>
          )
         }
         {/* all users  */}
       {
        role === 'admin' && (
          <Link to={"allusers"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
          All Users
        </Link>
        )
       }
       {
        role === 'admin' && 'volunteer' && (
          <Link to={"all-blood-donation-request"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
            All Blood Donation Request Page
          </Link>
        )
       }
        {
        role === 'volunteer' && (
          <Link to={"manage-donation-request"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
             Manage Donation Requests
          </Link>
        )
       }
      </nav>

      {/* Logout */}
      <button
      onClick={handlesignout}
      className="btn btn-error w-full mt-10">
        Logout
      </button>
    </aside>
  );
};

export default Aside;
