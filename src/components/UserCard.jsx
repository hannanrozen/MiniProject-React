import React from "react";
import { MessageCircle } from "lucide-react";

const UserCard = ({ user, onClick }) => {
  return (
    <div
      data-testid="user-card"
      onClick={() => onClick(user.id)}
      className="group relative bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-[#4F46E5] rounded-full animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-xl group-hover:ring-[#4F46E5]/20 transition-all duration-300"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#4F46E5] transition-colors duration-300">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-600 text-sm font-medium">{user.email}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
            Active
          </span>
          <span className="px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-semibold rounded-full">
            Team Member
          </span>
        </div>

        <div className="flex items-center gap-3 w-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="flex-1 px-3 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4F46E5]/90 transition-colors duration-200">
            View Profile
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <MessageCircle size={16} />
          </button>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4F46E5]/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default UserCard;
