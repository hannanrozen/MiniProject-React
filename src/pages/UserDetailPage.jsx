import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Back from "../assets/icons/back.svg";

const UserDetailPage = () => {
  const [user, setUser] = useState({ data: null, support: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUser = async (userId) => {
    setLoading(true);
    try {
      const response = await api.get(`/users/${userId}`);
      console.log("Response:", response.data);
      if (response.data) {
        setUser({ data: response.data.data, support: response.data.support });
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
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <div className="text-lg text-gray-600">Loading user details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <img src={Back} alt="Back" className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* User Detail Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Background */}
            <div className="relative h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <img
                src={user.data?.avatar}
                alt={`${user.data?.first_name} ${user.data?.last_name}`}
                className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0 w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover"
              />
            </div>

            {/* User Information */}
            <div className="pt-20 pb-8 px-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.data?.first_name} {user.data?.last_name}
                </h1>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <p className="text-gray-600 text-lg">{user.data?.email}</p>
                </div>

                {/* User ID Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                  User ID: {user.data?.id}
                </div>

                {/* Support Section */}
                {user.support && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Support Information
                      </h3>
                      <blockquote className="text-gray-700 italic mb-4 text-lg">
                        "{user.support.text}"
                      </blockquote>
                      <a
                        href={user.support.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                        Visit Support Page
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
