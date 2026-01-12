import React from 'react';
import Banner from './Banner';
import FeaturedSection from './FeaturedSection';
import ContactUs from './ContactUs';
import About from './About';

const Home = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-red-50 dark:bg-gray-900">
            {/* Background decorative red circles */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full blur-xl opacity-60 dark:bg-red-900/30 dark:opacity-40"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full blur-xl opacity-40 dark:bg-red-800/30 dark:opacity-30"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-300 rounded-full blur-lg opacity-30 dark:bg-red-700/30 dark:opacity-20"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-100 rounded-full blur-lg opacity-50 dark:bg-red-900/20 dark:opacity-30"></div>
            </div>

            {/* Page content */}
            <div className="relative z-10">
                <Banner />
                <FeaturedSection />
                <ContactUs />
               
            </div>
        </div>
    );
};

export default Home;
