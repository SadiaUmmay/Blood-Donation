import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-10 left-10 w-48 h-48 bg-red-900 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-red-800 rounded-full blur-3xl opacity-5"></div>
    </div>
    
    {/* Animated blood drops */}
    <div className="absolute top-20 right-1/4 w-4 h-6 bg-red-600 rounded-full rotate-45 opacity-20 animate-pulse"></div>
    <div className="absolute bottom-32 left-1/3 w-3 h-5 bg-red-500 rounded-full rotate-12 opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & About - Enhanced */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🩸</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
              Red Love
            </h2>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Connecting compassionate donors with patients in urgent need. Every donation creates a ripple effect of hope and healing in our community.
          </p>
          <div className="flex gap-4 pt-2">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-red-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <span className="text-lg">{social === 'facebook' ? '📘' : social === 'twitter' ? '🐦' : social === 'instagram' ? '📷' : '💼'}</span>
              </a>
            ))}
          </div>
        </div>
  
        {/* Quick Links - Enhanced */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
            Quick Links
          </h3>
          <div className="space-y-3">
            {[
              { to: '/', label: 'Home' },
              { to: '/donation-requests', label: 'Donation Requests' },
              { to: '/search-donors', label: 'Search Donors' },
              { to: '/funding', label: 'Funding' }
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-all duration-300 group hover:translate-x-2"
              >
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
  
        {/* Support - Enhanced */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            Support
          </h3>
          <div className="space-y-3">
            {[
              { to: '/contact', label: 'Contact Us' },
              { to: '/register', label: 'Become a Donor' },
              { to: '/faq', label: 'FAQ' },
              { to: '/terms', label: 'Terms & Conditions' }
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-all duration-300 group hover:translate-x-2"
              >
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
  
        {/* Emergency Contact - Enhanced */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Emergency Contact
          </h3>
          <div className="p-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-red-900/50 hover:border-red-700/50 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">24/7 Blood Support</p>
                <p className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                  +880 1000-000890
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              For urgent blood needs, contact us immediately. Our emergency team responds within minutes.
            </p>
            <button className="mt-4 w-full py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-[1.02]">
              Emergency Call
            </button>
          </div>
        </div>
      </div>
  
      {/* Newsletter Subscription */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="max-w-xl mx-auto">
          <h4 className="text-lg font-bold text-center text-white mb-4">Stay Updated with Life-Saving Opportunities</h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-white placeholder-gray-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            We'll only send you important updates and emergency alerts
          </p>
        </div>
      </div>
    </div>
  
    {/* Bottom Bar - Enhanced */}
    <div className="relative z-10 border-t border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-red-400 font-medium">RedLove</span>. All rights reserved. 
            <span className="mx-2">•</span>
            <span className="text-gray-400">Saving lives since 2024</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
              Sitemap
            </Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
              Accessibility
            </Link>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 mt-4">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Trusted by 100+ Hospitals
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            ISO Certified
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
