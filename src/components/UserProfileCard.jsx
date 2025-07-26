import React from "react";
import { Mail } from "lucide-react";

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
      <div className="relative h-48 bg-gradient-to-br from-[#4F46E5] via-purple-600 to-blue-600">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-purple-300/20 rounded-full blur-xl"></div>
        </div>

        {/* Avatar dengan Online Status Indicator */}
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0">
          <div className="relative group">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover ring-4 ring-white/20 transition-all duration-300 group-hover:ring-8 group-hover:ring-[#4F46E5]/10"
            />

            {/* Online status indicator - positioned at bottom-right of avatar */}
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Hover effect ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4F46E5]/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-8 px-8 text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            {user.first_name} {user.last_name}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
              <Mail size={20} className="text-gray-500" />
              <p className="text-gray-700 font-medium">{user.email}</p>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-sm font-bold rounded-full border border-emerald-200 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Active Member</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 text-[#4F46E5] text-sm font-bold rounded-full border border-[#4F46E5]/20 shadow-sm">
              <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
              <span>Team Member</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
          <div className="text-center group cursor-pointer transition-all duration-300 hover:bg-[#4F46E5]/5 rounded-2xl p-4">
            <div className="text-3xl font-black text-[#4F46E5] mb-2 group-hover:scale-110 transition-transform duration-300">
              #{user.id}
            </div>
            <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
              User ID
            </div>
          </div>
          <div className="text-center group cursor-pointer transition-all duration-300 hover:bg-emerald-50 rounded-2xl p-4">
            <div className="text-3xl font-black text-emerald-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              5.0
            </div>
            <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
              Rating
            </div>
          </div>
          <div className="text-center group cursor-pointer transition-all duration-300 hover:bg-purple-50 rounded-2xl p-4">
            <div className="text-3xl font-black text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              24
            </div>
            <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
              Projects
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
