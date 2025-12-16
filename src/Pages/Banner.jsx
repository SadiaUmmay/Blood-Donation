import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Donate Blood, Save Lives  ❤️
          </h1>

          <p className="mb-8 text-lg">
            Join our community of blood donors or search for donors near you.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="btn btn-primary"
            >
              Join as a Donor
            </Link>

            <Link
              to="/search"
              className="btn btn-outline btn-primary"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
