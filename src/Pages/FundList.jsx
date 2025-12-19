import React, { useEffect, useState, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";

const FundList = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/payments"); // backend route to get all payments
        setFunds(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch funds");
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, [axiosInstance]);

  if (loading)
    return <p className="text-center mt-10">Loading funds...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Funds</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Donor Name / Email</th>
              <th>Amount</th>
              <th>Funding Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No funds yet
                </td>
              </tr>
            ) : (
              funds.map((fund, index) => (
                <tr key={fund._id}>
                  <td>{index + 1}</td>
                  <td>{fund.fundEmail}</td>
                  <td>${fund.amount}</td>
                  <td>{new Date(fund.paidAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundList;
