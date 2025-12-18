import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpozilla: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const [districts, setDistricts] = useState([]);
  const [upozillas, setUpozillas] = useState([]);

  // fetch districts & upazilas
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

  // fetch donation request data
  useEffect(() => {
    if (!id) return;

    axiosSecure.get(`/requests/${id}`)
      .then(res => {
        const data = res.data;
        setFormData({
          recipientName: data.recipientName || "",
          recipientDistrict: data.recipientDistrict || "",
          recipientUpozilla: data.recipientUpozilla || "",
          hospitalName: data.hospitalName || "",
          fullAddress: data.fullAddress || "",
          bloodGroup: data.bloodGroup || "",
          donationDate: data.donationDate || "",
          donationTime: data.donationTime || "",
          requestMessage: data.requestMessage || "",
        });
      })
      .catch(err => console.log(err));
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosSecure.patch(`/requests/${id}`, formData)
      .then(() => {
        Swal.fire("Updated!", "Donation request updated successfully", "success");
        navigate("/dashboard/donationrequest"); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Donation Request</h2>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>

          <select
            name="recipientUpozilla"
            value={formData.recipientUpozilla}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Upazila</option>
            {upozillas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        </div>

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

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

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

        <textarea
          name="requestMessage"
          placeholder="Why do you need blood?"
          value={formData.requestMessage}
          onChange={handleChange}
          className="textarea textarea-bordered w-full h-28"
          required
        />

        <button  type="submit" className="btn btn-primary w-full">Update Donation Request</button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
