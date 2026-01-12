import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  FaHeartbeat, 
  FaUsers, 
  FaHospital, 
  FaGlobe, 
  FaHandHoldingHeart,
  FaClock,
  FaShieldAlt,
  FaAward,
  FaAmbulance,
  FaMapMarkerAlt
} from 'react-icons/fa';

const About = () => {
  const [hoveredTeamMember, setHoveredTeamMember] = useState(null);

  const stats = [
    { id: 'donors', label: 'Active Donors', value: '10,234+', icon: <FaUsers className="text-3xl" /> },
    { id: 'lives', label: 'Lives Saved', value: '32,567+', icon: <FaHeartbeat className="text-3xl" /> },
    { id: 'hospitals', label: 'Partner Hospitals', value: '245+', icon: <FaHospital className="text-3xl" /> },
    { id: 'cities', label: 'Cities Covered', value: '58', icon: <FaGlobe className="text-3xl" /> },
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director',
      bio: '15+ years in transfusion medicine. Former head of hematology at City General Hospital.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      achievements: ['MBBS, MD Hematology', 'Published 20+ research papers', 'Led 500+ blood drives']
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Lead',
      bio: 'Built our donor matching algorithm. Ex-Google engineer passionate about healthcare tech.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      achievements: ['Computer Science PhD', 'AI/ML Specialist', 'Built scalable matching systems']
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Community Manager',
      bio: 'Organizes 100+ blood drives annually. Passionate about building donor communities.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',

      achievements: ['Social Work Masters', '10 years NGO experience', '100k+ donors mobilized']
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Operations Head',
      bio: 'Ensures 24/7 emergency response. Former military logistics officer.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      achievements: ['MBA, Operations', 'Military logistics background', '99.9% delivery success rate']
    }
  ];

  const milestones = [
    { year: '2015', title: 'The Beginning', description: 'Started with 3 hospitals in Mumbai. First 100 donations completed.', icon: '🚀' },
    { year: '2017', title: 'Mobile App Launch', description: 'Released first mobile app with real-time donor tracking.', icon: '📱' },
    { year: '2019', title: 'National Expansion', description: 'Expanded to 25+ cities across India. Reached 10,000+ donors.', icon: '🇮🇳' },
    { year: '2021', title: 'AI Integration', description: 'Implemented smart donor-recipient matching algorithm.', icon: '🤖' },
    { year: '2023', title: '1M+ Milestone', description: 'Crossed 1 million successful donations nationwide.', icon: '🏆' },
    { year: '2024', title: '24/7 Emergency', description: 'Launched round-the-clock emergency response system.', icon: '🚨' }
  ];

  const values = [
    { icon: <FaHeartbeat className="text-4xl" />, title: 'Life First', description: 'Every life is precious. We prioritize emergency cases and ensure no request goes unanswered.', color: 'from-red-500 to-pink-500' },
    { icon: <FaShieldAlt className="text-4xl" />, title: 'Safety & Trust', description: 'Rigorous donor screening, proper storage, and complete transparency in every process.', color: 'from-blue-500 to-cyan-500' },
    { icon: <FaClock className="text-4xl" />, title: 'Speed Saves', description: 'Average response time of 45 minutes. Every minute counts in emergencies.', color: 'from-green-500 to-emerald-500' },
    { icon: <FaUsers className="text-4xl" />, title: 'Community Power', description: 'Building a network of compassionate donors who are ready to help when needed.', color: 'from-purple-500 to-violet-500' }
  ];

  const emergencyStats = [
    { label: 'Average Response Time', value: '45 min', icon: <FaClock /> },
    { label: 'Emergency Requests Handled', value: '25,000+', icon: <FaAmbulance /> },
    { label: 'Cities with 24/7 Coverage', value: '40+', icon: <FaMapMarkerAlt /> },
    { label: 'Verified Donors', value: '10,000+', icon: <FaAward /> }
  ];

  const stories = [
    { title: "The Midnight Emergency", content: "When little Rohan needed rare B- blood at 2 AM, our network found a donor within 30 minutes. The donor, a college student, immediately left for the hospital and saved Rohan's life.", name: "Mrs. Sharma, Mother", location: "Delhi" },
    { title: "Flood Relief Mission", content: "During the Kerala floods, we coordinated 500+ donations across 10 relief camps. Our volunteers worked 72 hours straight to ensure blood supply for affected areas.", name: "Red Love Volunteers", location: "Kerala" },
    { title: "Rare Blood Type Match", content: "A patient with Bombay blood group needed urgent surgery. Through our nationwide network, we found the only compatible donor 800km away and arranged immediate transport.", name: "Dr. Kapoor, Surgeon", location: "Mumbai" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/10 to-orange-600/10 dark:from-red-900/20 dark:via-pink-900/20 dark:to-orange-900/20" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 dark:from-red-500 dark:via-pink-500 dark:to-orange-500 bg-clip-text text-transparent">Our Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            From a simple idea to India's largest blood donation network. We're on a mission to ensure no life is lost due to lack of blood.
          </p>
          <Link to="/register" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <FaHandHoldingHeart className="text-xl" />
            Join Our Mission
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-red-500 dark:text-red-400 mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story + Emergency Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              How It <span className="text-red-600 dark:text-red-500">Started</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">In 2015, our founder witnessed a young mother pleading for blood donors for her child at a Mumbai hospital. That heartbreaking moment sparked a question: <strong className="text-red-600 dark:text-red-400">"In the age of instant connectivity, why can't we find blood donors instantly?"</strong></p>
            <p className="text-gray-600 dark:text-gray-300">Starting with a simple WhatsApp group of 50 donors, we grew into a nationwide movement. Today, Red Love connects thousands of willing donors with those in urgent need across India.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {emergencyStats.map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-4 rounded-xl flex items-center gap-3">
                  <div className="text-red-600 dark:text-red-400">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop" alt="Blood donation saving lives" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-2xl shadow-2xl text-center">
              <div className="text-4xl font-bold">1M+</div>
              <div className="text-sm">Donations Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our <span className="text-red-600 dark:text-red-500">Journey</span>
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 via-pink-500 to-orange-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`inline-block p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl">{milestone.icon}</div>
                        <div>
                          <div className="text-2xl font-bold text-red-600 dark:text-red-500">{milestone.year}</div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 border-4 border-white dark:border-gray-900 shadow-lg z-10 md:block hidden"></div>
                  <div className="md:hidden h-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our <span className="text-red-600 dark:text-red-500">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className={`mb-6 text-gradient bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Stories That <span className="text-red-600 dark:text-red-500">Inspire</span>
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl mb-6">❤️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{story.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">"{story.content}"</p>
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="font-medium text-gray-900 dark:text-white">{story.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{story.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our <span className="text-red-600 dark:text-red-500">Team</span></h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">Passionate individuals working round the clock to ensure help reaches those in need.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <div key={member.id} className="group relative" onMouseEnter={() => setHoveredTeamMember(member.id)} onMouseLeave={() => setHoveredTeamMember(null)}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                    <div className="text-red-600 dark:text-red-500 font-medium mb-3">{member.role}</div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                    <div className={`transition-all duration-300 ${hoveredTeamMember === member.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Achievements:</div>
                        <ul className="space-y-1">
                          {member.achievements.map((ach, idx2) => (
                            <li key={idx2} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Save Lives?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of donors who are making a difference every day. Your single donation can save up to 3 lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">Become a Donor</Link>
              <Link to="/donation-requests" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">View Urgent Requests</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
