import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

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
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );

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
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Daftar User</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        <div className="text-center mt-4 text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
