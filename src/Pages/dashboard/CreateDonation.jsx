import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateDonation = () => {
  const { user } = useContext(AuthContext)
  const [upozillas, setUpozillas] = useState([])
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState([])
  const [upozilla, setUpozilla] = useState([])


  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axios.get('/Upozilla.json')
      .then(res => {
        setUpozillas(res.data.upazilas)
      })

    axios.get('/District.json')
      .then(res => {
        setDistricts(res.data.districts)
      })
  }, [])

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target

    const requesterName = form.requesterName.value
    const requesterEmail = form.requesterEmail.value
    const recipientName = form.recipientName.value
    const recipientUpozilla = form.recipientUpozilla.value
    const recipientDistrict = form.recipientDistrict.value
    const hospitalName = form.hospitalName.value
    const fullAddress = form.fullAddress.value
    const bloodGroup = form.bloodGroup.value
    const donationDate = form.donationDate.value
    const donationTime = form.donationTime.value
    const requestMessage = form.requestMessage.value

    const formData = {
      bloodGroup,
      requesterName,
      requesterEmail,
      recipientName,
      recipientUpozilla,
      recipientDistrict,
      hospitalName,
      fullAddress,
      donationDate,
      donationTime,
      requestMessage,
      donationStatus : "pending"
    }
  
    axiosSecure.post('/requests',formData)
    .then(res=>{
   
      alert(res.data.insertedId)
    }).catch(err=> console.log(err))
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>

      {/* {isBlocked && (
        <p className="text-red-600 font-semibold mb-4">
          ⚠ You are blocked. You cannot create a donation request.
        </p>
      )} */}

      <form onSubmit={handleRequest} className="space-y-4">

        {/* REQUESTER INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="requesterName"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />

          <input
            type="email"
            name="requesterEmail"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* RECIPIENT NAME */}
        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={user?.name}

          className="input input-bordered w-full"
          required
        />

        {/* DISTRICT + UPAZILA */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* district select  */}
          <select
            name="recipientDistrict"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select">
            <option disabled selected value=''> Select Your Disrict</option>
            {
              districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
            }
          </select>

          {/* upazila select  */}
          <select
            name="recipientUpozilla"
            value={upozilla}
            onChange={(e) => setUpozilla(e.target.value)}
            className="select">
            <option disabled selected value=''> Select Your Upazila</option>
            {
              upozillas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
            }
          </select>
        </div>

        {/* HOSPITAL + FULL ADDRESS */}
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          // value={formData.hospitalName}

          className="input input-bordered w-full"
          required
        />

        <input 
          type="text"
          name="fullAddress"
          placeholder="Full Address"
          // value={formData.fullAddress}

          className="input input-bordered w-full"
          required
        />

        {/* BLOOD GROUP */}
        <select
          name="bloodGroup"
          // value={formData.bloodGroup}

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
            // value={formData.donationDate}

            className="input input-bordered w-full"
            required
          />

          <input
            type="time"
            name="donationTime"
            // value={formData.donationTime}

            className="input input-bordered w-full"
            required
          />
        </div>

        {/* MESSAGE */}
        <textarea
          name="requestMessage"
          placeholder="Why do you need blood?"
          // value={formData.requestMessage}

          className="textarea textarea-bordered w-full h-28"
          required
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={`btn btn-primary w-full `}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
