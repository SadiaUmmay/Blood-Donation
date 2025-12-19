
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const DonationRequest = () => {

    const [totalRequest, setTotalRequest] = useState(0);
    const [myRequests, setMyRequests] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.get(`/donationrequest?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequests(res.data.request)
                setTotalRequest(res.data.totalRequest)
            })
    }, [axiosSecure, currentPage, itemsPerPage])

    const numberOFpages = Math.ceil(totalRequest / itemsPerPage);
    const pages = [...Array(numberOFpages).keys()].map(e => e + 1)

    // console.log(myRequests)
    // console.log(totalRequest)
    // console.log(pages)
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }



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
                        // Refresh the request list
                        setMyRequests(prev => prev.filter(r => r._id !== id));
                        setTotalRequest(prev => prev - 1);
                    })
                    .catch(err => console.log(err));
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myRequests.map((request, index) =>
                                <tr>
                                    <th>{(currentPage * 10) + (index + 1) - 10}</th>
                                    <td>{request.recipientName}</td>
                                    <td>{request.recipientDistrict},{request.recipientUpozilla}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.donationTime}</td>
                                    <td>{request.bloodGroup}</td>
                                    <td>
                                        <span className={`badge ${request.donationStatus === "pending" ? "badge-warning" :
                                            request.donationStatus === "inprogress" ? "badge-info" :
                                                request.donationStatus === "done" ? "badge-success" :
                                                    "badge-error"
                                            }`}>
                                            {request.donationStatus}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        <Link
                                            to={`/donation-request/${request._id}`}
                                            className="btn btn-xs btn-primary"
                                        >
                                            View
                                        </Link>
                                        <button
                                            className="btn btn-xs btn-warning"
                                            onClick={() => navigate(`/dashboard/edit-donation-request/${request._id}`)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleDelete(request._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex justify-center items-center gap-4 mt-10'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {
                    pages.map(page =>

                        <button
                            className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`}
                            onClick={() => setCurrentPage(page)}>
                            {page}
                        </button>
                    )
                }
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default DonationRequest;