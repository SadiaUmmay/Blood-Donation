// import { div } from "framer-motion/client";
import { FaLocationDot } from "react-icons/fa6";
import { MdWifiCalling3 } from "react-icons/md";

const ContactUs = () => {
    return (
      <div>
        <section className="py-20 bg-gradient-to-b from-base-100 to-base-200 relative overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute top-10 right-10 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
  <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
  
  <div className="max-w-6xl mx-auto px-6 relative z-10">
    {/* Section Header with Animation */}
    <div className="text-center mb-16 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mb-6 shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce-slow">
        <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent animate-slide-down">
        Contact Us
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
        Have questions or need urgent help? Our team is here for you 24/7.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Contact Form with Enhanced Design */}
      <div className="group">
        <div className="card bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-2">
          {/* Form Header with Gradient */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 p-6">
            <h3 className="card-title text-2xl font-bold text-white flex items-center gap-3">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Us a Message
            </h3>
          </div>
          
          <div className="card-body p-8">
            <form className="space-y-6">
              {/* Name Input with Icon */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full pl-12 py-4 rounded-xl border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 hover:shadow-md"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Email Input with Icon */}
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full pl-12 py-4 rounded-xl border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 hover:shadow-md"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Message Textarea with Icon */}
              <div className="relative group">
                <textarea
                  placeholder="Your Message"
                  className="textarea textarea-bordered w-full pl-12 pt-4 rounded-xl border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 hover:shadow-md"
                  rows="4"
                  required
                ></textarea>
                <div className="absolute left-4 top-4 text-gray-400 group-hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>

              {/* Submit Button with Animation */}
              <button 
                type="submit" 
                className="btn w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-red-300 hover:scale-[1.02] transition-all duration-300 group animate-pulse-slow"
              >
                <span className="flex items-center justify-center gap-3">
                  Send Message
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Info with Enhanced Design */}
      <div className="space-y-8 animate-slide-left">
        {/* Emergency Contact Card */}
        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-xl border border-red-100 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            Emergency Contact
          </h3>

          {/* Location Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaLocationDot className="text-red-600 text-lg" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">Available 24/7</p>
                <p className="text-gray-600 text-sm mt-1">For emergency blood requests</p>
              </div>
            </div>

            {/* Phone Number with Animation */}
            <div className="flex items-center gap-4 group animate-pulse-slow">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <MdWifiCalling3 className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Emergency Hotline</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  +880 120-900-890
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-fade-in">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-blue-700">Support Available For:</span> Donor registration, 
                urgent blood needs, appointment scheduling, and general inquiries.
              </p>
            </div>

            {/* Support Hours */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-500">Response Time</p>
                <p className="font-semibold text-green-600">Within 15 min</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-500">Available Days</p>
                <p className="font-semibold text-red-600">365 Days/Year</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Icons */}
        <div className="flex justify-center md:justify-start gap-6">
          {[
            { icon: '📧', label: 'Email', color: 'bg-blue-100', hover: 'hover:bg-blue-200' },
            { icon: '💬', label: 'WhatsApp', color: 'bg-green-100', hover: 'hover:bg-green-200' },
            { icon: '📞', label: 'Call', color: 'bg-red-100', hover: 'hover:bg-red-200' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`w-16 h-16 ${item.color} ${item.hover} rounded-2xl flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-bounce-delay`}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

 
 
</section>
      </div>
    );
  };
  
  export default ContactUs;
  