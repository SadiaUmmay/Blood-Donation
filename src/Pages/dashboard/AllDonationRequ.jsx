import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const AllDonationRequ = () => {
  const { role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const fetchRequests = () => {
    let url = "/all-blood-donation-request";
    if (filterStatus) url += `?status=${filterStatus}`;

    axiosSecure
      .get(url)
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  const updateStatus = (id, newStatus) => {
    Swal.fire({
      title: "Confirm?",
      text: `Change status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/requests/status/${id}`, { status: newStatus })
          .then(() => {
            Swal.fire("Updated!", "Status changed successfully", "success");
            setRequests((prev) =>
              prev.map((r) =>
                r._id === id ? { ...r, donationStatus: newStatus } : r
              )
            );
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete your donation request permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/requests/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your request has been deleted.", "success");
            setRequests((prev) => prev.filter((r) => r._id !== id));
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        All Blood Donation Requests
      </h2>

      {/* Filter */}
      <div className="flex justify-end mb-4">
        <select
          className="select select-bordered w-40"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto ">
        <table className="table table-zebra w-full min-w-[900px] border rounded-lg shadow-md">
          <thead className="bg-red-950">
            <tr className="text-white">
              <th>Requester</th>
              <th>Recipient</th>
              <th>Blood</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
              <th>Admin Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
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

                  {/* Admin / Volunteer actions */}
                  <td className="space-x-2">
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

                  {/* Admin actions */}
                  {role === "admin" && (
                    <td className="space-x-2">
                      <Link
                        to={`/donation-request/${req._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() =>
                          navigate(
                            `/dashboard/edit-donation-request/${req._id}`
                          )
                        }
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
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
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
