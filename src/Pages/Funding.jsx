// Pages/Funding.jsx
import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import FundList from "./FundList";
import PaymentSuccess from "./PaymentSuccess";

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const fundAmount = e.target.fundAmount.value;

    const formData = {
      fundAmount,
      fundEmail: user?.email,
      fundName: user?.displayName,
    };

    try {
      const res = await axiosSecure.post("/create-payment-checkout", formData);
      window.location.href = res.data.url; 
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment");
    }
  };

  return (
    <div>
     

     <form onSubmit={handleCheckout} className="max-w-2xl mx-auto my-12 p-6">
  <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl mb-4 shadow-lg">
        <span className="text-2xl">💖</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Make a Difference Today
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Your contribution helps save lives. Every donation counts.
      </p>
    </div>

    {/* Amount Options */}
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Select or enter amount (in BDT):
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[100, 500, 1000, 2000].map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => {
              const input = document.querySelector('input[name="fundAmount"]');
              if (input) input.value = amount;
            }}
            className="group relative px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-red-500 dark:hover:border-red-500 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                ৳{amount}
              </span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Custom Amount Input */}
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Enter custom amount:
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 font-bold">৳</span>
        </div>
        <input
          type="number"
          name="fundAmount"
          placeholder="Enter Fund Amount (BDT)"
          className="pl-10 pr-4 py-4 w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white text-lg font-medium focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 transition-all duration-300"
          min="5"
          required
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 text-sm">BDT</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
        Minimum amount: ৳5 BDT
      </p>
    </div>

    {/* Donation Impact */}
    <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-lg">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Your Impact</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ৳100 can provide emergency blood supplies for one patient
          </p>
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="group relative w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Make a Secure Donation
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>

    {/* Security & Trust */}
    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-center gap-6 text-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>100% Secure Payment</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Tax Deductible</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Transparent Process</span>
        </div>
      </div>
    </div>
  </div>
</form>
      <FundList />
     
    </div>
  );
};

export default Funding;
