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
      .get(`https://blooddonation-nu.vercel.app/donation-requests/${id}`)
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
        `https://blooddonation-nu.vercel.app/requests/${id}/donate`,
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
    <div className="max-w-4xl mx-auto p-6 md:p-8">
  <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
    {/* Header */}
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"></div>
      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Donation Request Details
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
              <span className="text-xl font-bold text-white">🩸</span>
            </div>
          </div>
        </div>
        <p className="text-white/90">Life-saving information for urgent donation request</p>
      </div>
    </div>

    {/* Request Details */}
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recipient Info Card */}
        <div className="bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {request.recipientName?.charAt(0) || 'R'}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recipient</h3>
              <p className="text-gray-600 dark:text-gray-400">Awaiting your help</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Recipient Name</p>
                <p className="font-semibold text-gray-800 dark:text-white">{request.recipientName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-semibold text-gray-800 dark:text-white">{request.location || request.hospitalName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Details Card */}
        <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Donation Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Blood Group</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-bold">
                      {request.bloodGroup}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.donationStatus === "pending" 
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400" 
                      : request.donationStatus === "inprogress"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                      : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                  }`}>
                    {request.donationStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{request.date || request.donationDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{request.time || request.donationTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Additional Notes
          </h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 italic">
              {request.requestMessage || "No additional notes provided."}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Link 
          to="/donation-requests" 
          className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Requests
        </Link>

        <button
          onClick={() => setModalOpen(true)}
          disabled={request.donationStatus !== "pending"}
          className={`group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            request.donationStatus !== "pending"
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl hover:-translate-y-1 hover:shadow-red-200 dark:hover:shadow-red-900/30"
          }`}
        >
          {request.donationStatus !== "pending" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Request Already Processed
            </span>
          ) : (
            <>
              <span className="relative z-10 flex items-center justify-center gap-3">
                Donate Now
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          )}
        </button>
      </div>
    </div>
  </div>

  {/* Modal */}
  {modalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Confirm Your Donation
          </h3>
          <p className="text-white/90 mt-2">Please verify your information before proceeding</p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <form onSubmit={confirmDonation} className="space-y-6">
            {/* Donor Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user?.displayName?.charAt(0) || 'D'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">You're helping as</p>
                  <p className="font-bold text-gray-800 dark:text-white">{user?.displayName}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
              <div className="flex items-center justify-center gap-2 text-sm text-red-700 dark:text-red-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Your donation could save up to 3 lives
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold"
              >
                Confirm Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default DonationRequestDetails;
