
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DonationRequest = () => {

    const [totalRequest, setTotalRequest] = useState(0);
    const [myRequests, setMyRequests] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure()

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
    const handlePrev = ()=>{
       if(currentPage>1){
        setCurrentPage(currentPage-1)
       }
    }

    const handleNext=()=>{
        if(currentPage< pages.length){
            setCurrentPage(currentPage+ 1)
        }
    }

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Hospital Name</th>
                            <th>Blood Group</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myRequests.map((request, index) =>
                                <tr>
                                    <th>{(currentPage * 10) + (index + 1)-10}</th>
                                    <td>{request.recipientName}</td>
                                    <td>{request.hospitalName}</td>
                                    <td>{request.bloodGroup}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex justify-center items-center gap-4 mt-10'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {
                    pages.map(page=>
                      
                        <button
                        className={`btn ${page === currentPage ? 'bg-[#435585] text-white'  : ''}`}
                         onClick={()=>setCurrentPage(page)}>
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