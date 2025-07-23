import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch all 12 users (2 pages of 6 users each)
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      // Fetch page 1 and page 2 to get exactly 12 users
      const [page1Response, page2Response] = await Promise.all([
        api.get("/users?page=1"),
        api.get("/users?page=2"),
      ]);

      const page1Users = page1Response.data?.data || [];
      const page2Users = page2Response.data?.data || [];
      const combinedUsers = [...page1Users, ...page2Users];

      setAllUsers(combinedUsers);

      // Display first 6 users initially (page 1)
      setDisplayedUsers(combinedUsers.slice(0, 6));
      setCurrentPage(1);
      setTotalPages(2);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Gagal memuat data users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (page = 1) => {
    if (allUsers.length === 0) return;

    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const pageUsers = allUsers.slice(startIndex, endIndex);

    setDisplayedUsers(pageUsers);
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchUsers(page);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const value = searchTerm.toLowerCase();
    const filtered = allUsers.filter(
      (user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    setDisplayedUsers(filtered.slice(0, 6)); // Show first 6 of filtered results
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setDisplayedUsers(allUsers.slice(0, 6)); // Reset to first page
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="pt-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#4F46E5]/10 rounded-full text-[#4F46E5] text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-[#4F46E5] rounded-full mr-2 animate-pulse"></div>
              Team Management Dashboard
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-[#4F46E5] to-gray-900 bg-clip-text text-transparent">
              Welcome to Staffinity
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your team management with powerful analytics, seamless
              collaboration tools, and real-time insights into your
              organization's performance.
            </p>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-[#4F46E5] to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 9a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {allUsers.length}
                </h3>
                <p className="text-gray-600 text-sm">Total Members</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.floor(allUsers.length * 0.85)}
                </h3>
                <p className="text-gray-600 text-sm">Active Today</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  +{Math.floor(allUsers.length * 0.15)}
                </h3>
                <p className="text-gray-600 text-sm">This Week</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">5</h3>
                <p className="text-gray-600 text-sm">Departments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Staffinity Features Section */}
        <section className="bg-gradient-to-br from-white/90 to-indigo-50/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Staffinity Core Features
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Experience the power of modern HR management with our
              comprehensive suite of tools designed to strengthen workplace
              collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-600 mb-3 group-hover:text-[#4F46E5] transition-colors duration-300">
                Visual Organization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                See your entire team in a dynamic org chart with real-time
                updates and interactive member profiles.
              </p>
              <div className="mt-4 flex items-center text-sm text-[#4F46E5] font-medium">
                <span>Active: {allUsers.length} members</span>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-600 mb-3 group-hover:text-[#4F46E5] transition-colors duration-300">
                HR Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track growth, engagement, and retention trends easily with
                comprehensive data visualization and insights.
              </p>
              <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
                <span>Engagement: 84% avg</span>
                <svg
                  className="w-4 h-4 ml-1 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-600 mb-3 group-hover:text-[#4F46E5] transition-colors duration-300">
                Recognize Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Celebrate employee milestones and achievements with our
                integrated recognition and rewards system.
              </p>
              <div className="mt-4 flex items-center text-sm text-orange-600 font-medium">
                <span>94% satisfaction</span>
                <svg
                  className="w-4 h-4 ml-1 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM3 12l2-2m0 0l7 7-7-7zM5 10l7 7m0 0l7-7m-7 7V3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-600 mb-3 group-hover:text-[#4F46E5] transition-colors duration-300">
                Smart Notifications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get intelligent reminders for contracts, events, birthdays, and
                important organizational milestones.
              </p>
              <div className="mt-4 flex items-center text-sm text-purple-600 font-medium">
                <span>Real-time alerts</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full ml-2 animate-ping"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Search Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Find Your Team Members
            </h2>
            <p className="text-gray-600">
              Search through your organization with advanced filtering
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all duration-300 text-lg"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center justify-center mt-6 space-x-4">
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-gradient-to-r from-[#4F46E5] to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search Team
              </button>

              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Total: {allUsers.length} members</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full mr-2"></div>
                <span>
                  Showing: {displayedUsers.length} results
                  {searchTerm && " (filtered)"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Directory Section */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Team Directory
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with your colleagues and discover the talented individuals
              that make our organization great.
            </p>
          </div>

          {displayedUsers.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No team members found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your search criteria or browse all team members to
                find who you're looking for.
              </p>
              <button
                onClick={handleClearSearch}
                className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Show All Members
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {displayedUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={handleUserClick}
                  />
                ))}
              </div>

              {/* Enhanced Pagination */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Showing</span>
                    <span className="font-semibold text-[#4F46E5]">
                      {displayedUsers.length}
                    </span>
                    <span>of</span>
                    <span className="font-semibold text-[#4F46E5]">
                      {allUsers.length}
                    </span>
                    <span>
                      team members (Page {currentPage} of {totalPages})
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 transition-all duration-300"
                    >
                      <svg
                        className="w-4 h-4 mr-1 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Previous
                    </button>

                    <div className="flex items-center space-x-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                            currentPage === index + 1
                              ? "bg-gradient-to-r from-[#4F46E5] to-blue-600 text-white shadow-lg transform scale-110"
                              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] hover:scale-105"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 transition-all duration-300"
                    >
                      Next
                      <svg
                        className="w-4 h-4 ml-1 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
