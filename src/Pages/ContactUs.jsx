import { FaLocationDot } from "react-icons/fa6";
import { MdWifiCalling3 } from "react-icons/md";

const ContactUs = () => {
    return (
      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
            <p className="text-gray-500">
              Have questions or need urgent help? Reach out to us anytime.
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Contact Form */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title mb-4">Send Us a Message</h3>
  
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    required
                  />
  
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                    required
                  />
  
                  <textarea
                    placeholder="Your Message"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    required
                  ></textarea>
  
                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
  
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">
                Emergency Contact
              </h3>
  
              <p className="mb-3 flex items-center gap-1">
                <FaLocationDot></FaLocationDot> Available 24/7 for emergency blood requests
              </p>
  
              <p className="text-xl font-bold text-primary flex items-center gap-1">
              <MdWifiCalling3 /> +880 120-900-890
              </p>
  
              <p className="mt-4 text-gray-600">
                You can also contact us for donor registration support,
                urgent blood needs, or general inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default ContactUs;
  