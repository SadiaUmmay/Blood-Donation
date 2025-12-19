import { useEffect, useState } from "react";

import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const PublicDonationRequ = () => {
    const [requests, setRequests] = useState([]);
    const axiosInstance = useAxios();
  

    useEffect(() => {
        axiosInstance.get('/donation-requests')
            .then(res => setRequests(res.data))
            .catch(err => console.error(err));
    }, [axiosInstance]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold  text-center my-6">Pending Blood Donation Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500">No pending requests</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requests.map(req => (
                        <div key={req._id} className="card bg-base-100 shadow p-4">
                            <h3 className="font-semibold text-lg">{req.recipientName}</h3>
                            <p>Location: {req.hospitalName}</p>
                            <p>Blood Group: {req.bloodGroup}</p>
                            <p>Date: {req.donationDate}</p>
                            <p>Time: {req.donationTime}</p>
                            <Link
                                to={`/donation-request/${req._id}`}
                                className="w-full inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary transition duration-300 transform hover:scale-105 mt-2 text-center"
                            >
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicDonationRequ;
