import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/users?page=${page}`);

      console.log("API Response:", response.data);
      if (response.data && response.data.data) {
        setUsers(response.data.data);
        setCurrentPage(response.data.page || 1);
        setTotalPages(response.data.total_pages || 1);
      } else {
        setError("Format data tidak sesuai");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Gagal memuat data users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchUsers(page);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
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
    <div className="pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">User List</h1>

        <div className="grid grid-cols-1 max-w-6xl mx-auto lg:grid-cols-3 gap-6 mb-8">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer transition-shadow"
            >
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg
              hover:bg-indigo-500 transition-all duration-300
              disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded shadow-md ${
                  currentPage === index + 1
                    ? "bg-[#4F46E5] text-white shadow-md"
                    : "bg-white text-[#4F46E5] border border-[#4F46E5]/30 hover:border-indigo-500 hover:bg-[#4F46E5]/5"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg
              hover:bg-indigo-500 transition-all duration-300
              disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
