import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import VolunteerDashboardHome from "./VolunteerDashboardHome";
import DonorDashboardHome from "./DonorDashboardHome";


const MainDashBoard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const { role , loading } = useContext(AuthContext)
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/donation-requests?email=${user.email}`)
        .then((res) => {
          setRequests(res.data.slice(0, 3));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);





  return (
    <div className="p-6">
      {/* Welcome Message */}
      <h1 className="text-3xl font-semibold mb-5">
        Welcome, <span className="text-primary">{user?.displayName}</span> 👋
      </h1>
      {
        role === 'volunteer' &&(
          <VolunteerDashboardHome></VolunteerDashboardHome>
        )
      }
    {
        role === 'donor' &&(
          <DonorDashboardHome></DonorDashboardHome>
        )}
    </div>
  );
};

export default MainDashBoard;
