import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllDonationRequ = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch all requests
  const fetchRequests = () => {
    let url = '/all-blood-donation-request';
    if (filterStatus) url += `?status=${filterStatus}`;

    axiosSecure
      .get(url)
      .then(res => setRequests(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, [axiosSecure, filterStatus]);

  // Update donationStatus
  const updateStatus = (id, newStatus) => {
    Swal.fire({
      title: "Confirm?",
      text: `Change status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/requests/status/${id}`, { status: newStatus }) // <-- 'status' matches server
          .then(() => {
            Swal.fire("Updated!", "Status changed successfully", "success");
            // Update UI
            setRequests(prev =>
              prev.map(r =>
                r._id === id ? { ...r, donationStatus: newStatus } : r
              )
            );
          })
          .catch(err => console.log(err));
      }
    });
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests</h2>

      {/* Filter by status */}
      <select
        className="select select-bordered mb-4 w-64"
        value={filterStatus}
        onChange={e => setFilterStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Requester</th>
              <th>Recipient</th>
              <th>Blood</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.requesterName}</td>
                <td>{req.recipientName}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.recipientDistrict}</td>
                <td>{req.donationDate}</td>
                <td>
                  <span
                    className={`badge ${
                      req.donationStatus === "pending"
                        ? "badge-warning"
                        : req.donationStatus === "approved"
                        ? "badge-success"
                        : req.donationStatus === "done"
                        ? "badge-info"
                        : "badge-error"
                    }`}
                  >
                    {req.donationStatus}
                  </span>
                </td>
                <td className="space-x-2">
                  {/* Pending: Approve / Cancel */}
                  {req.donationStatus === "pending" && (
                    <>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => updateStatus(req._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => updateStatus(req._id, "cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {/* Approved: Mark Done */}
                  {req.donationStatus === "approved" && (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => updateStatus(req._id, "done")}
                    >
                      Mark Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonationRequ;
