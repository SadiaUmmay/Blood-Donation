import { Link } from "react-router";

const Aside = () => {
    return (
      <aside className="w-64 min-h-screen bg-base-200 border-r p-5 hidden md:block">
        {/* Profile */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <img
            src="https://i.ibb.co/7k5T1Bb/default.jpg"
            alt="profile"
            className="w-16 h-16 rounded-full border"
          />
          <h3 className="font-semibold text-lg">User Name</h3>
          <p className="text-sm text-gray-500">user@gmail.com</p>
        </div>
  
        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <Link to={"/dashboard"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
            Dashboard
          </Link>
          <Link to={"profiledash"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
            My Profile
          </Link>
          <Link to={"donationrequest"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
            My Donation Requests
          </Link>
          <Link to={"createdonation"} className="px-3 py-2 rounded-lg hover:bg-base-300 cursor-pointer">
          Create Donation Request
          </Link>
        </nav>
  
        {/* Logout */}
        <button className="btn btn-error w-full mt-10">
          Logout
        </button>
      </aside>
    );
  };
  
  export default Aside;
  