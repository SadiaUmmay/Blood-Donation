import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateDonation = ({ user, isBlocked }) => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [formData, setFormData] = useState({
    requesterName: user?.name || "",
    requesterEmail: user?.email || "",
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
    status: "pending",
  });

  // Example: fetch district + upazila JSON from your backend or local file
  useEffect(() => {
    fetch("/districts.json")
      .then(res => res.json())
      .then(data => setDistricts(data));
  }, []);

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);

    const districtData = districts.find(d => d.name === dist);
    setUpazilas(districtData ? districtData.upazilas : []);

    setFormData({ ...formData, recipientDistrict: dist });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      return alert("You are blocked. You cannot create a donation request.");
    }

    try {
      const res = await axios.post("/donation-requests", formData);
      alert("Donation Request Created Successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to create request");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>

      {isBlocked && (
        <p className="text-red-600 font-semibold mb-4">
          ⚠ You are blocked. You cannot create a donation request.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* REQUESTER INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.requesterName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />

          <input
            type="email"
            value={formData.requesterEmail}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* RECIPIENT NAME */}
        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* DISTRICT + UPAZILA */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="recipientDistrict"
            onChange={handleDistrictChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select District</option>
            {districts.map((dist, idx) => (
              <option key={idx} value={dist.name}>
                {dist.name}
              </option>
            ))}
          </select>

          <select
            name="recipientUpazila"
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map((up, idx) => (
              <option key={idx} value={up}>
                {up}
              </option>
            ))}
          </select>
        </div>

        {/* HOSPITAL + FULL ADDRESS */}
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="fullAddress"
          placeholder="Full Address"
          value={formData.fullAddress}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* BLOOD GROUP */}
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        {/* DATE + TIME */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* MESSAGE */}
        <textarea
          name="requestMessage"
          placeholder="Why do you need blood?"
          value={formData.requestMessage}
          onChange={handleChange}
          className="textarea textarea-bordered w-full h-28"
          required
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={`btn btn-primary w-full ${isBlocked && "btn-disabled"}`}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
