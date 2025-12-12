import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";


const MainDashBoard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/donation-requests?email=${user.email}`)
        .then((res) => {
          setRequests(res.data.slice(0, 3)); // latest 3 requests
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleStatus = (id, newStatus) => {
    axios
      .patch(`http://localhost:5000/donation-requests/${id}`, {
        donationStatus: newStatus,
      })
      .then(() => {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, donationStatus: newStatus } : r
          )
        );
      });
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    axios.delete(`http://localhost:5000/donation-requests/${id}`).then(() => {
      setRequests((prev) => prev.filter((r) => r._id !== id));
    });
  };

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <h1 className="text-3xl font-semibold mb-5">
        Welcome, <span className="text-primary">{user?.displayName}</span> 👋
      </h1>

      {/* If no requests hide this section */}
      {requests.length > 0 && (
        <div className="bg-base-200 p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Your Recent Donation Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>
                      {req.donationDate} <br /> {req.donationTime}
                    </td>
                    <td>{req.bloodGroup}</td>

                    <td className="font-bold">{req.donationStatus}</td>

                    {/* Donor information only when inprogress */}
                    <td>
                      {req.donationStatus === "inprogress" ? (
                        <div>
                          <p>{req.donorName}</p>
                          <p className="text-sm">{req.donorEmail}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>

                    <td className="flex flex-col gap-2">
                      {/* View */}
                      <Link
                        to={`/dashboard/request/${req._id}`}
                        className="btn btn-sm"
                      >
                        View
                      </Link>

                      {/* Edit */}
                      <Link
                        to={`/dashboard/edit-request/${req._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Edit
                      </Link>

                      {/* Done / Cancel (only when inprogress) */}
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatus(req._id, "done")}
                          >
                            Done
                          </button>

                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => handleStatus(req._id, "canceled")}
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All */}
          <div className="text-center mt-6">
            <Link to="/dashboard/my-requests" className="btn btn-primary">
              View My All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainDashBoard;
