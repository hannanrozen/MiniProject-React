import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import BackButton from "../components/BackButton";
import UserProfileCard from "../components/UserProfileCard";
import UserActions from "../components/UserActions";
import UserStats from "../components/UserStats";
import UserTabs from "../components/UserTabs";

const UserDetailPage = () => {
  const [user, setUser] = useState({ data: null, support: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async (userId) => {
    setLoading(true);
    try {
      const response = await api.get(`/users/${userId}`);
      if (response.data) {
        setUser({
          data: response.data.data,
          support: response.data.support,
        });
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
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4F46E5]/20"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4F46E5] border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800 mb-2">
              Loading user details...
            </div>
            <div className="text-sm text-gray-500">
              Please wait while we fetch the information
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-red-600 text-lg font-bold mb-4">{error}</div>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white font-semibold rounded-2xl hover:from-[#4F46E5]/90 hover:to-purple-600/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4F46E5]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto mb-8">
          <BackButton to="/home" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <UserProfileCard user={user.data} />
            <div className="px-8 py-6 space-y-8">
              <UserStats user={user.data} />
              <UserActions user={user.data} />
              <UserTabs userId={user.data.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
