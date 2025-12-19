import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch donation request
  useEffect(() => {
    if (!id) return;

    
    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:5000/donation-requests/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch donation request");
        setLoading(false);
      });
  }, [id]);

 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="text-center py-10 text-red-500 font-bold">
        {error || "Donation request not found"}
      </div>
    );
  }

  const confirmDonation = async (e) => {
    e.preventDefault();
  
    try {
      const token = await user.getIdToken(); 
  
      const res = await axios.patch(
        `http://localhost:5000/requests/${id}/donate`,
        { donorName: user.displayName, donorEmail: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (res.data.success) {
        setRequest(prev => ({
          ...prev,
          donationStatus: "inprogress",
          donorName: user.displayName,
          donorEmail: user.email,
        }));
        setModalOpen(false);
        Swal.fire({ icon: "success", title: "Donation Confirmed!", timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire("Error", "Donation could not be confirmed", "error");
      }
    } catch (err) {
      console.error("Axios Error:", err.response || err.message);
      Swal.fire("Error", "Failed to confirm donation", "error");
    }
  };
  
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Donation Request Details
      </h2>

      <div className="space-y-3">
        <p><strong>Recipient Name:</strong> {request.recipientName}</p>
        <p><strong>Location:</strong> {request.location || request.hospitalName}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Date:</strong> {request.date || request.donationDate}</p>
        <p><strong>Time:</strong> {request.time || request.donationTime}</p>
        <p><strong>Note:</strong> {request.requestMessage || "N/A"}</p>
        <p><strong>Status:</strong> {request.donationStatus}</p>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        disabled={request.donationStatus !== "pending"}
        className="btn btn-primary mt-6 w-full"
      >
        Donate
      </button>


      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Donation</h3>

            <form onSubmit={confirmDonation} className="space-y-4">
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link to="/donation-requests" className="btn btn-sm btn-outline btn-error">
          ← Back to Requests
        </Link>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
