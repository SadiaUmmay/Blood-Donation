import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaTint, FaHandHoldingHeart } from "react-icons/fa";

const VolunteerDashboardHome = () => {
  const [stats, setStats] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/admin-stats") 
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, [axiosSecure]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="stat bg-base-100 shadow rounded-xl">
        <div className="stat-figure text-primary">
          <FaUsers size={30} />
        </div>
        <div className="stat-title">Total Users</div>
        <div className="stat-value">{stats.totalUsers}</div>
      </div>

      <div className="stat bg-base-100 shadow rounded-xl">
        <div className="stat-figure text-secondary">
          <FaTint size={30} />
        </div>
        <div className="stat-title">Total Requests</div>
        <div className="stat-value">{stats.totalRequests}</div>
      </div>

      <div className="stat bg-base-100 shadow rounded-xl">
        <div className="stat-figure text-accent">
          <FaHandHoldingHeart size={30} />
        </div>
        <div className="stat-title">Total Funding</div>
        <div className="stat-value">${stats.totalFunds}</div>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;
