import { HiHeart } from "react-icons/hi";
import { Link } from "react-router";
import { GiWaterDrop } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
const FeaturedSection = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold mb-4">
          Why Become a Blood Donor?
        </h2>
        <p className="text-gray-500 mb-12">
          Your single donation can save multiple lives. Here’s why it matters.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-3 text-red-700 border-2 p-1"><HiHeart></HiHeart></div>
              <h3 className="card-title">Save Lives</h3>
              <p>
                One blood donation can help up to three patients in need.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-3 text-red-700 border-2 p-1"><GiWaterDrop /></div>
              <h3 className="card-title">Emergency Ready</h3>
              <p>
                Blood is needed every day for accidents, surgeries, and
                emergencies.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-3 text-yellow-500 border-2 p-1"><FaHandshake /></div>
              <h3 className="card-title">Community Impact</h3>
              <p>
                Join a trusted network of donors making a real difference.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link to="/donation-requests" className="btn btn-primary">
            View Donation Requests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
