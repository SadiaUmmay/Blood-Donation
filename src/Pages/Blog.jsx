import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaHeartbeat, 
  FaTags, 
  FaSearch,
  FaArrowRight,
  FaShareAlt,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
  FaFilter
} from 'react-icons/fa';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('recent');

  // Blog categories
  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'health', name: 'Health Tips', count: 8 },
    { id: 'donation', name: 'Donation Guide', count: 6 },
    { id: 'stories', name: 'Success Stories', count: 5 },
    { id: 'research', name: 'Medical Research', count: 3 },
    { id: 'community', name: 'Community News', count: 2 }
  ];

  // Filter options
  const filters = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'featured', name: 'Featured' }
  ];

  // Featured blog post
  const featuredPost = {
    id: 1,
    title: "The Life-Saving Power of One: How Your Donation Makes a Difference",
    excerpt: "Discover the incredible journey of a single blood donation - from the moment you decide to donate to the lives you save. Learn about the science, the process, and the real impact.",
    author: "Dr. Sarah Johnson",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    category: "donation",
    tags: ["Donation", "Impact", "Science"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",

    isFeatured: true
  };

  // Blog posts data
  const blogPosts = [
    {
      id: 2,
      title: "10 Health Benefits of Regular Blood Donation",
      excerpt: "Donating blood isn't just good for recipients - it's great for donors too! Explore the surprising health benefits that regular donors experience.",
      author: "Dr. Michael Chen",
      date: "Mar 12, 2024",
      readTime: "6 min read",
      category: "health",
      tags: ["Health", "Benefits", "Wellness"],
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "A Miracle in Mumbai: How 50 Strangers Saved a Life",
      excerpt: "When a rare blood type was needed urgently, our community came together. Read this heartwarming story of unity and compassion.",
      author: "Priya Sharma",
      date: "Mar 8, 2024",
      readTime: "5 min read",
      category: "stories",
      tags: ["Success Story", "Community", "Emergency"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"

    },
    {
      id: 4,
      title: "Understanding Blood Types: A Complete Guide",
      excerpt: "From A+ to O- negative, learn everything about blood types, compatibility, and why some types are rarer than others.",
      author: "Dr. Sarah Johnson",
      date: "Mar 5, 2024",
      readTime: "10 min read",
      category: "health",
      tags: ["Blood Types", "Science", "Education"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Breaking Myths: The Truth About Blood Donation Safety",
      excerpt: "Separating fact from fiction - we debunk the most common myths and misconceptions about blood donation safety.",
      author: "David Wilson",
      date: "Feb 28, 2024",
      readTime: "7 min read",
      category: "donation",
      tags: ["Myths", "Safety", "Education"],
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      title: "How Technology is Revolutionizing Blood Banks",
      excerpt: "From AI-powered matching to blockchain tracking, discover how technology is making blood donation smarter and safer.",
      author: "Michael Chen",
      date: "Feb 25, 2024",
      readTime: "9 min read",
      category: "research",
      tags: ["Technology", "Innovation", "Future"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
    },
    {
      id: 7,
      title: "Young Donors: Why Students Are Leading the Change",
      excerpt: "Meet the college students who are organizing blood drives and inspiring their generation to become regular donors.",
      author: "Priya Sharma",
      date: "Feb 20, 2024",
      readTime: "4 min read",
      category: "community",
      tags: ["Youth", "Leadership", "Inspiration"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
    },
    {
      id: 8,
      title: "Before & After: Your Donation Preparation Checklist",
      excerpt: "Everything you need to know before donating blood - from diet tips to post-donation care for optimal recovery.",
      author: "Dr. Sarah Johnson",
      date: "Feb 18, 2024",
      readTime: "5 min read",
      category: "donation",
      tags: ["Preparation", "Tips", "Checklist"],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop"
    },
    {
      id: 9,
      title: "The Emotional Impact of Saving a Life",
      excerpt: "Hear from donors about the profound emotional satisfaction that comes from knowing you've saved someone's life.",
      author: "David Wilson",
      date: "Feb 15, 2024",
      readTime: "6 min read",
      category: "stories",
      tags: ["Emotional", "Impact", "Testimonials"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
    }
  ];

  // Trending articles
  const trendingArticles = [
    { id: 1, title: "Can Vegetarians Donate Blood?", reads: "2.5k" },
    { id: 2, title: "The Science Behind Blood Regeneration", reads: "1.8k" },
    { id: 3, title: "How Often Can You Safely Donate?", reads: "1.5k" },
    { id: 4, title: "Winter Blood Shortages: Why They Happen", reads: "1.2k" }
  ];

  // Filtered posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Apply sorting based on active filter
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeFilter === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (activeFilter === 'popular') {
      // Simulate popularity with IDs for now
      return b.id - a.id;
    }
    return 0;
  });

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle filter selection
  const handleFilterSelect = (filterId) => {
    setActiveFilter(filterId);
  };

  // Calculate reading stats
  const totalArticles = blogPosts.length + 1; // +1 for featured
  const totalReadTime = Math.ceil(
    (featuredPost.readTime + blogPosts.reduce((sum, post) => 
      sum + parseInt(post.readTime), 0
    )) / 60
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-pink-600/5 to-orange-600/5 dark:from-red-900/10 dark:via-pink-900/10 dark:to-orange-900/10" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 dark:from-red-500 dark:via-pink-500 dark:to-orange-500 bg-clip-text text-transparent">
                Red Love Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Stories, research, and insights about blood donation, health, and the incredible impact of our community.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  className="block w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-500">{totalArticles}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-500">{categories.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-500">{totalReadTime}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hours of Reading</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <FaTags />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <FaFilter />
                  Sort By
                </h3>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterSelect(filter.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        activeFilter === filter.id
                          ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Articles */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Trending Now 🔥
                </h3>
                <div className="space-y-4">
                  {trendingArticles.map((article) => (
                    <div
                      key={article.id}
                      className="group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                          {article.id}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 mb-1">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>👁️ {article.reads} reads</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-white/90 mb-6 text-sm">
                  Get the latest articles and blood donation insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                  <button className="w-full px-4 py-3 bg-white text-red-600 font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              {/* Results Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCategory === 'all' ? 'All Articles' : 
                      categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {sortedPosts.length} articles found
                  </p>
                </div>
                
                {/* Mobile Category Filter */}
                <div className="lg:hidden">
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 4).map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {sortedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                          <FaUser className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <FaHeartbeat className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
                            <FaBookmark className="w-5 h-5" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
                            <FaShareAlt className="w-5 h-5" />
                          </button>
                          <Link
                            to={`/blog/${post.id}`}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm flex items-center gap-1 group/read"
                          >
                            Read More
                            <FaArrowRight className="w-3 h-3 group-hover/read:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-600 text-white">
                    1
                  </button>
                  
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    2
                  </button>
                  
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    3
                  </button>
                  
                  <span className="px-2 text-gray-400">...</span>
                  
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    8
                  </button>
                  
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>

              {/* Empty State */}
              {sortedPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No articles found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Want to Share Your Story?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Have a blood donation experience or health insight to share? We'd love to feature your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/share-story"
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Share Your Story
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Become a Contributor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;