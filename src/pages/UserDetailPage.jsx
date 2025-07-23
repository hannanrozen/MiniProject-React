import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import BackButton from "../components/BackButton";
import UserProfileCard from "../components/UserProfileCard";
import UserActions from "../components/UserActions";
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
        <div className="max-w-4xl mx-auto mb-6">
          <BackButton to="/home" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <UserProfileCard user={user.data} />
            <div className="px-6 py-4">
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
