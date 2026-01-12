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
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Pending Blood Donation Requests
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Urgent requests from people in need. Your donation could save a life today.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-full">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Urgent Attention Needed
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-medium rounded-full">
              {requests.length} Active Requests
            </span>
          </div>
        </div>
      
        {requests.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Pending Requests</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">All urgent requests have been addressed. Check back later for new requests.</p>
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-medium">
                Refresh Requests
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map(req => (
              <div 
                key={req._id} 
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              >
                {/* Urgent Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full shadow-lg">
                    URGENT
                  </span>
                </div>
      
                {/* Blood Group Indicator */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white font-bold rounded-xl shadow-lg">
                    {req.bloodGroup}
                  </div>
                </div>
      
                {/* Main Content */}
                <div className="p-6 pt-16">
                  {/* Recipient Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-red-600 dark:text-red-400">
                        {req.recipientName?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
                        {req.recipientName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Needs your help</p>
                    </div>
                  </div>
      
                  {/* Request Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Hospital</p>
                        <p className="font-medium text-gray-800 dark:text-white line-clamp-1">{req.hospitalName}</p>
                      </div>
                    </div>
      
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                          <p className="font-medium text-gray-800 dark:text-white">{req.donationDate}</p>
                        </div>
                      </div>
      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                          <p className="font-medium text-gray-800 dark:text-white">{req.donationTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
      
                  {/* Action Button */}
                  <Link
                    to={`/donation-request/${req._id}`}
                    className="group/btn block w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Request Details
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </Link>
      
                  {/* Emergency Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      <span>Your donation could save multiple lives</span>
                    </div>
                  </div>
                </div>
      
                {/* Decorative Background Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/5 to-pink-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        )}
      
        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-500">{requests.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Requests</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-500">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Emergency Service</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-500">45min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PublicDonationRequ;
