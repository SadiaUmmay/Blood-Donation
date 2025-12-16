import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-8xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">🩸 Red Love</h2>
          <p className="text-sm">
            BloodCare connects donors with patients in need. Your contribution
            helps save lives and strengthen communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <Link to="/" className="link link-hover block">Home</Link>
          <Link to="/donation-requests" className="link link-hover block">
            Donation Requests
          </Link>
          <Link to="/search-donors" className="link link-hover block">
            Search Donors
          </Link>
          <Link to="/funding" className="link link-hover block">
            Funding
          </Link>
        </div>

        {/* Support */}
        <div>
          <h3 className="footer-title">Support</h3>
          <Link to="/contact" className="link link-hover block">
            Contact Us
          </Link>
          <Link to="/register" className="link link-hover block">
            Become a Donor
          </Link>
          <Link to="/faq" className="link link-hover block">
            FAQ
          </Link>
          <Link to="/terms" className="link link-hover block">
            Terms & Conditions
          </Link>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="footer-title">Emergency</h3>
          <p className="mb-2">24/7 Blood Support</p>
          <p className="font-bold text-lg text-primary">
            📞 +880 1000-000890
          </p>
          <p className="text-sm mt-2">
            For urgent blood needs, contact us immediately.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-content/20 py-4 text-center text-sm">
        © {new Date().getFullYear()} RedLove. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
