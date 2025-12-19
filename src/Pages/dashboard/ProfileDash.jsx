import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const ProfileDash = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editable, setEditable] = useState(false);

  // Load user data from server
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/role/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  if (!profile) return <p className="p-10 text-center">Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    const updatedProfile = {
      name: profile.name,
      district: profile.district,
      upozilla: profile.upozilla,
      bloodGroup: profile.bloodGroup,
    };
  
    axios
      .patch(`http://localhost:5000/users/${profile._id}`, updatedProfile)
      .then(() => {
        setEditable(false)
         //  Success Swal
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Profile updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    })
    .catch(() => {
      // Error Swal
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
      });
    });
  };
      
  
  

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">My Profile</h2>

        {!editable ? (
          <button
            onClick={() => setEditable(true)}
            className="btn btn-primary btn-sm"
          >
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn btn-success btn-sm">
            Save
          </button>
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={profile.mainPhotoUrl || user.photoURL}
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />
      </div>

      {/* Profile Form */}
      <form className="space-y-4">
        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        {/* Email (never editable) */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* District */}
        <div>
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <input
            type="text"
            name="district"
            value={profile.district || ""}
            onChange={handleChange}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <input
            type="text"
            name="upozilla"
            value={profile.upozilla || ""}
            onChange={handleChange}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            name="bloodGroup"
            disabled={!editable}
            value={profile.bloodGroup || ""}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ProfileDash;
