import { HiHeart } from "react-icons/hi";
import { Link } from "react-router";
import { GiWaterDrop } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
    
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      {/* Section Heading - Enhanced with Motion */}
      <div className="text-center mb-16">
        <div 
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mb-6 shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce"
          style={{animation: 'bounce 3s ease-in-out infinite'}}
        >
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        
        <h2 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent opacity-0 animate-slide-up"
          style={{animationDelay: '0.2s'}}
        >
          Why Become a Blood Donor?
        </h2>
        
        <p 
          className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed opacity-0 animate-slide-up"
          style={{animationDelay: '0.4s'}}
        >
          Your single donation can save multiple lives. Join thousands of heroes making a difference every day.
        </p>
      </div>
    
      {/* Feature Cards with Staggered Slide-up Animation */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 - Save Lives */}
        <div 
          className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-red-100 opacity-0 animate-slide-up"
          style={{animationDelay: '0.6s'}}
        >
          <div className="relative p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 shadow-lg group-hover:shadow-red-200 group-hover:scale-110 transition-transform duration-300">
              <div className="text-4xl text-red-600 animate-pulse">
                <HiHeart />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-red-700 transition-colors duration-300">
              Save Lives
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              One blood donation can help up to three patients in need.
            </p>
            
            {/* Animated Pulse Effect */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-red-400 rounded-full blur-xl opacity-30 animate-ping"></div>
          </div>
        </div>
    
        {/* Card 2 - Emergency Ready */}
        <div 
          className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-red-100 opacity-0 animate-slide-up"
          style={{animationDelay: '0.8s'}}
        >
          <div className="relative p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-red-100 shadow-lg group-hover:shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
              <div className="text-4xl text-red-600 animate-bounce">
                <GiWaterDrop />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-red-700 transition-colors duration-300">
              Emergency Ready
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              Blood is needed every day for accidents, surgeries, and emergencies.
            </p>
            
            {/* Floating Drops with staggered animation */}
            <div 
              className="absolute top-4 left-4 w-2 h-3 bg-red-300 rounded-full rotate-45 opacity-60 animate-bounce" 
              style={{animationDelay: '1.2s'}}
            ></div>
            <div 
              className="absolute bottom-4 right-4 w-2 h-3 bg-red-300 rounded-full rotate-45 opacity-60 animate-bounce" 
              style={{animationDelay: '1.5s'}}
            ></div>
          </div>
        </div>
    
        {/* Card 3 - Community Impact */}
        <div 
          className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-red-100 opacity-0 animate-slide-up"
          style={{animationDelay: '1s'}}
        >
          <div className="relative p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-yellow-100 to-red-100 shadow-lg group-hover:shadow-yellow-200 group-hover:scale-110 transition-transform duration-300">
              <div className="text-4xl text-yellow-500 animate-pulse">
                <FaHandshake />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-red-700 transition-colors duration-300">
              Community Impact
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              Join a trusted network of donors making a real difference.
            </p>
            
            {/* Animated Connection Lines */}
            <div className="absolute top-1/4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent">
              <div className="h-full bg-red-300 animate-line-expand" style={{animationDelay: '1.3s'}}></div>
            </div>
            <div className="absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent">
              <div className="h-full bg-red-300 animate-line-expand" style={{animationDelay: '1.5s'}}></div>
            </div>
            <div className="absolute bottom-1/4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent">
              <div className="h-full bg-red-300 animate-line-expand" style={{animationDelay: '1.7s'}}></div>
            </div>
          </div>
        </div>
      </div>
    
      {/* CTA Button with Animation */}
      <div 
        className="mt-16 text-center opacity-0 animate-slide-up"
        style={{animationDelay: '1.2s'}}
      >
        <Link 
          to="/donation-requests" 
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-red-300 hover:scale-105 transition-all duration-300"
        >
          <span className="animate-bounce">🩸</span>
          View Donation Requests
          <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  
   
    <style jsx>{`
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }
      
      @keyframes lineExpand {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }
      
      .animate-slide-up {
        animation: slideUp 0.8s ease-out forwards;
      }
      
      .animate-line-expand {
        animation: lineExpand 1s ease-out forwards;
      }
    `}</style>
  </section>
  );
};

export default FeaturedSection;
