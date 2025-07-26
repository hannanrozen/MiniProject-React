import React from "react";
import { Eye, CheckCircle, Star, Clock, TrendingUp } from "lucide-react";

const UserStats = ({ user }) => {
  // Use user data for dynamic stats if available, otherwise show default values
  const userName = user?.name || user?.first_name || "User";

  const stats = [
    {
      label: "Profile Views",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: <Eye className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Projects Completed",
      value: "24",
      change: "+3",
      trend: "up",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Team Rating",
      value: "4.9",
      change: "+0.2",
      trend: "up",
      icon: <Star className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Response Time",
      value: "2.4h",
      change: "-0.5h",
      trend: "down",
      icon: <Clock className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Performance Overview - {userName}
          </h3>
          <p className="text-gray-600">
            Track key metrics and performance indicators
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-emerald-600">
            Live Data
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
            >
              {stat.icon}
            </div>

            {/* Content */}
            <div className="mb-4">
              <div className="text-3xl font-black text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>

            {/* Change indicator */}
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                stat.trend === "up" ? "text-emerald-600" : "text-red-500"
              }`}
            >
              <TrendingUp
                size={16}
                className={stat.trend === "up" ? "rotate-0" : "rotate-180"}
              />
              <span>{stat.change}</span>
              <span className="text-gray-500">vs last month</span>
            </div>

            {/* Hover decoration */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
            ></div>
          </div>
        ))}
      </div>

      {/* Additional insights */}
      <div className="mt-8 pt-6 border-t border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Trending Up</div>
              <div className="text-sm text-gray-600">
                Performance is improving consistently
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Goals Met</div>
              <div className="text-sm text-gray-600">
                All quarterly targets achieved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
