import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const DonorDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchRecentRequests = () => {
    axiosSecure
      .get("/donationrequest?size=3&page=0")
      .then(res => setRequests(res.data.request))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  // Delete Request
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
            fetchRecentRequests();
          })
          .catch(err => console.log(err));
      }
    });
  };

  // View Request
  const handleView = (id) => {
    navigate(`/dashboard/view-donation-request/${id}`);
  };

  return (
    <div className="bg-white md:shadow-lg shadow-xs rounded-sm md:rounded-xl mt-6 overflow-x-auto  w-50 md:w-6xl  mx-auto p-1 md:p-6">
      {requests.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Recent Donation Requests</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Blood Group</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>{req.recipientDistrict}, {req.recipientUpozilla}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>
                      <span className={`badge ${
                        req.donationStatus === "pending" ? "badge-warning" :
                        req.donationStatus === "inprogress" ? "badge-info" :
                        req.donationStatus === "done" ? "badge-success" :
                        "badge-error"
                      }`}>
                        {req.donationStatus}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => handleView(req._id)}
                      >
                        View
                      </button>
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
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/dashboard/donationrequest")}
              >
                View All Requests
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorDashboardHome;
