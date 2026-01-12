import { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Search = () => {
    const [upozillas, setUpozillas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState([])
    const [upozilla, setUpozilla] = useState([])
    const axiosInstance = useAxios();
    const [searched, setSearched] = useState(false);
    const [donors, setDonors] = useState([]);
    useEffect(() => {
        axios.get('/Upozilla.json')
            .then(res => {
                setUpozillas(res.data.upazilas)
            })

        axios.get('/District.json')
            .then(res => {
                setDistricts(res.data.districts)
            })
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.bloodGroup.value;

        axiosInstance.get(`/search?bloodGroup=${bloodGroup}&district=${district}&upozilla=${upozilla}`)
            .then(res => {
                setDonors(res.data);
                setSearched(true);
                console.log(res.data)
            })
    };

    return (
        <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto my-12 p-4 md:p-6"
      >
        <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
              Find Life-Saving Donors
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Search for compatible blood donors in your area. Every second counts in an emergency.
            </p>
          </div>
      
          {/* Search Form */}
          <div className="space-y-6 mb-8">
            {/* Blood Group Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-600 dark:text-red-400 font-bold">🩸</span>
                </div>
                Blood Group Required
              </label>
              <div className="relative">
                <select
                  name="bloodGroup"
                  className="w-full px-4 py-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 transition-all duration-300 appearance-none cursor-pointer"
                  required
                  defaultValue="Choose Blood Group"
                >
                  <option disabled={true} className="text-gray-400">Choose Blood Group</option>
                  <option value="A+" className="text-gray-800 dark:text-white">A+ (A Positive)</option>
                  <option value="A-" className="text-gray-800 dark:text-white">A- (A Negative)</option>
                  <option value="B+" className="text-gray-800 dark:text-white">B+ (B Positive)</option>
                  <option value="B-" className="text-gray-800 dark:text-white">B- (B Negative)</option>
                  <option value="AB+" className="text-gray-800 dark:text-white">AB+ (AB Positive)</option>
                  <option value="AB-" className="text-gray-800 dark:text-white">AB- (AB Negative)</option>
                  <option value="O+" className="text-gray-800 dark:text-white">O+ (O Positive)</option>
                  <option value="O-" className="text-gray-800 dark:text-white">O- (O Negative)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
      
            {/* District Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  District
                </label>
                <div className="relative">
                  <select
                    name="recipientDistrict"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option disabled selected value='' className="text-gray-400">Select Your District</option>
                    {districts.map(d => (
                      <option value={d?.name} key={d.id} className="text-gray-800 dark:text-white">
                        {d?.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
      
              {/* Upazila Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  Upazila
                </label>
                <div className="relative">
                  <select
                    name="recipientUpozilla"
                    value={upozilla}
                    onChange={(e) => setUpozilla(e.target.value)}
                    className="w-full px-4 py-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 transition-all duration-300 appearance-none cursor-pointer"
                    disabled={!district}
                  >
                    <option disabled selected value='' className="text-gray-400">Select Your Upazila</option>
                    {upozillas.map(u => (
                      <option value={u?.name} key={u.id} className="text-gray-800 dark:text-white">
                        {u?.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          {/* Search Button */}
          <button
            type="submit"
            className="group relative w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search for Donors
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
      
          {/* Search Results */}
          {searched && (
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Available Donors
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Found {donors.length} matching donor{donors.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-full">
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    {donors.length} Result{donors.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
      
              {donors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donors.map(donor => (
                    <div
                      key={donor._id}
                      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:border-red-200 dark:hover:border-red-800/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                            {donor.name?.charAt(0) || 'D'}
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                            {donor.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Available Donor</p>
                        </div>
                      </div>
      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <span className="text-red-600 dark:text-red-400 font-bold text-sm">
                              {donor.bloodGroup}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Blood Group</p>
                            <p className="font-medium text-gray-800 dark:text-white">{donor.bloodGroup}</p>
                          </div>
                        </div>
      
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                            <p className="font-medium text-gray-800 dark:text-white">{donor.recipientDistrict}, {donor.recipientUpozilla}</p>
                          </div>
                        </div>
                      </div>
      
                      <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium">
                        Contact Donor
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No Donors Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    We couldn't find any matching donors in your area. Try expanding your search criteria or check back later.
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-medium"
                  >
                    Try Different Search
                  </button>
                </div>
              )}
            </div>
          )}
      
          {/* Emergency Info */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">Emergency?</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Call our 24/7 helpline: 106</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
};

export default Search;
