// Pages/FundList.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FundList = () => {
  const axiosSecure = useAxiosSecure();
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axiosSecure.get("/payments");
        setFunds(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFunds();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">All Donations</h2>
      <ul className="space-y-2">
        {funds.map((fund, i) => (
        <li key={i} className="border p-3 rounded">
        {fund.fundName} donated {fund.amount} {fund.currency} on{" "}
        {new Date(fund.paidAt).toLocaleString()}
      </li>
      
        ))}
      </ul>
    </div>
  );
};

export default FundList;
