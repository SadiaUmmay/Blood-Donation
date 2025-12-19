import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const AllDonationRequ = () => {
  const { role } = useContext(AuthContext)
  
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  
  const navigate = useNavigate()

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
  }, [filterStatus]);

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
          .patch(`/requests/status/${id}`, { status: newStatus })
          .then(() => {
            Swal.fire("Updated!", "Status changed successfully", "success");
            // Update UI
            setRequests(prev =>
              prev.map(r =>
                r._id === id ? { ...r, donationStatus: newStatus } : r
              )
            );
            console.log(newStatus)
          })
          .catch(err => console.log(err));
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete your donation request permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/requests/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your request has been deleted.", "success");
            setRequests(prev => prev.filter(r => r._id !== id));
          })
          .catch(err => console.log(err));
      }
    });
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests</h2>



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
              <th>Actions</th>
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
                    className={`badge ${req.donationStatus === "pending"
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

                  {/* Admin / Volunteer actions */}
                  {(role === "admin" || role === "volunteer") && (
                    <>
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

                      {req.donationStatus === "approved" && (
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => updateStatus(req._id, "done")}
                        >
                          Mark Done
                        </button>
                      )}
                    </>
                  )}
                    </td>
                  {/* Donor actions */}
                
                  {
                    role === "admin" && (
                      <td className="space-x-2">
                      <Link
                        to={`/donation-request/${req._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        View
                      </Link>

                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(req._id)}
                      >
                        Delete
                      </button>
                    </td>
                    )
                  }
                
              

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
