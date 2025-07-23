import React from "react";

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="relative h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 bottom-0 w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover"
        />
      </div>
      <div className="pt-20 pb-8 px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {user.first_name} {user.last_name}
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
          <p className="text-gray-600 text-lg">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
