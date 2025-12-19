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
     

      <form onSubmit={handleCheckout} className="max-w-2xl mx-auto my-10">
        <input
          type="number"
          name="fundAmount"
          placeholder="Enter Fund Amount (BDT)"
          className="input input-bordered mr-2"
          min="5"
          required
        />
        <button className="btn btn-primary">💳 Give Fund</button>
      </form>
      <FundList />
     
    </div>
  );
};

export default Funding;
