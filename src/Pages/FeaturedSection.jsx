import { HiHeart } from "react-icons/hi";
import { Link } from "react-router";
import { GiWaterDrop } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-100 dark:bg-red-800/30 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl mb-6 shadow-lg animate-bounce">
            <HiHeart className="text-red-600 dark:text-red-400 text-2xl" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-700 to-red-900 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
            Why Become a Blood Donor?
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Your single donation can save multiple lives. Join thousands of heroes making a difference every day.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-red-100 dark:border-red-700">
            <div className="relative p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <HiHeart className="text-red-600 dark:text-red-400 text-4xl animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-red-700 transition-colors duration-300">
                Save Lives
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                One blood donation can help up to three patients in need.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-red-100 dark:border-red-700">
            <div className="relative p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GiWaterDrop className="text-red-600 dark:text-red-400 text-4xl animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-red-700 transition-colors duration-300">
                Emergency Ready
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Blood is needed every day for accidents, surgeries, and emergencies.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-red-100 dark:border-red-700">
            <div className="relative p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaHandshake className="text-yellow-500 dark:text-red-400 text-4xl animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-red-700 transition-colors duration-300">
                Community Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Join a trusted network of donors making a real difference.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link 
            to="/donation-requests" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white dark:from-red-500 dark:to-red-700 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            🩸 View Donation Requests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
