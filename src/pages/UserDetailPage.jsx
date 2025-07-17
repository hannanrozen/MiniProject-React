import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const UserDetail = () => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const id = useParams().id;

  const fetchUser = async (userId) => {
    setLoading(true);
    try {
      const response = await api.get(`/users/${userId}`);

      console.log("API Response:", response.data);
      if (response.data && response.data.data) {
        setUsers(response.data.data);
      } else {
        setError("Format data tidak sesuai");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

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
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Detail</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <img
              src={user.avatar}
              alt={"Avatar"}
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="text-gray-600">Email: {user?.email}</p>
            <h3 className="text-xl font-semibold mb-2">
              {user?.first_name} {user?.last_name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
