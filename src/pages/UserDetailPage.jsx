import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Back from "../assets/icons/back.svg";

const UserDetail = () => {
  const [user, setUsers] = useState({ data: null, support: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const id = useParams().id;

  const fetchUser = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await api.get(`/users/${userId}`);
      console.log("Response:", response.data);
      if (response.data) {
        setUsers({ data: response.data.data, support: response.data.support });
      } else {
        setError("Format data tidak sesuai");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser(id);
  }, [id, fetchUser]);

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
      <div className="mt-20 container mx-auto px-4">
        <div className="flex max-w-6xl mx-auto p-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-6 px-4 py-2 
        bg-[#090979] text-white rounded-lg hover:bg-[#1e1ea8] 
        transition-all duration-300 shadow-md"
          >
            <img src={Back} alt="Back" className="w-6 h-6" />
            Back
          </button>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-[#020024] via-[#090979] to-[#00d4ff]">
            <img
              src={user.data?.avatar}
              alt={"User avatar"}
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0
            w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          <div className="pt-20 pb-8 px-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user.data?.first_name} {user.data?.last_name}
              </h1>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.data?.text}
              </h2>
              <p className="text-gray-600 mb-4">{user.data?.email}</p>

              {user.support && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-black font-semibold">
                    {`"${user.support.text}"`}
                  </p>
                  <a
                    href={user.support.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-[#090979] hover:text-[#1e1ea8] 
                     transition-colors duration-300 underline"
                  >
                    Support Link
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
