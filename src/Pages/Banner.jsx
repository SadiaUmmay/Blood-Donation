import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="hero min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-50">
  {/* Background decorative elements */}
  <div className="absolute inset-0 z-0">
    <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full blur-xl opacity-60"></div>
    <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full blur-xl opacity-40"></div>
    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-300 rounded-full blur-lg opacity-30"></div>
    <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-100 rounded-full blur-lg opacity-50"></div>
  </div>

  {/* Blood drop pattern */}
  <div className="absolute inset-0 z-0 opacity-5">
    <div className="absolute top-20 left-1/4 w-12 h-16 bg-red-500 rounded-full rotate-45"></div>
    <div className="absolute bottom-32 right-1/3 w-10 h-14 bg-red-500 rounded-full rotate-12"></div>
    <div className="absolute top-40 right-1/4 w-8 h-12 bg-red-500 rounded-full -rotate-45"></div>
  </div>

  <div className="hero-content text-center relative z-10">
    <div className="max-w-2xl">
      {/* Animated heart icon */}
      <div className="mb-8 animate-pulse">
        <div className="inline-block p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-xl shadow-red-200">
          <svg 
            className="w-16 h-16 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>

      {/* Main heading with gradient text */}
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
        Donate Blood, <br/>
        <span className="relative">
          Save Lives
          <span className="absolute -right-8 top-0 animate-bounce">❤️</span>
        </span>
      </h1>

      {/* Subtitle with animation */}
      <p className="mb-10 text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
        Every drop counts. Join our community of heroes or find the life-saving help you need.
      </p>

      {/* Stats showcase */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <div className="stat">
          <div className="stat-value text-red-600 text-3xl font-bold">10,000+</div>
          <div className="stat-desc text-gray-600">Lives Saved</div>
        </div>
        <div className="stat">
          <div className="stat-value text-red-600 text-3xl font-bold">5,000+</div>
          <div className="stat-desc text-gray-600">Active Donors</div>
        </div>
        <div className="stat">
          <div className="stat-value text-red-600 text-3xl font-bold">24/7</div>
          <div className="stat-desc text-gray-600">Support</div>
        </div>
      </div>

      {/* Call to action buttons with enhanced styling */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
        <Link
          to="/signup"
          className="group relative px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:shadow-red-200 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Become a Donor
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        <Link
          to="/search"
          className="group px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
        >
          Find Donors Near You
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </Link>
      </div>

      {/* Trust indicators */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm mb-4">Trusted by leading hospitals and organizations</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div className="w-24 h-10 bg-gray-200 rounded-lg">RMC</div>
          <div className="w-24 h-10 bg-gray-200 rounded-lg">DMC</div>
          <div className="w-24 h-10 bg-gray-200 rounded-lg">KMC</div>
          <div className="w-24 h-10 bg-gray-200 rounded-lg">SSMC</div>
        </div>
      </div>

      {/* Quick info banner */}
      <div className="mt-8 bg-gradient-to-r from-red-100 to-red-50 rounded-2xl p-4 border border-red-200">
        <div className="flex items-center justify-center gap-3">
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z"/>
            <path d="M11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
          </svg>
          <span className="text-sm text-gray-700">
            <span className="font-semibold text-red-600">Quick fact:</span> One donation can save up to 3 lives
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Banner;
