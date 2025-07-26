import React, { useState } from "react";
import {
  User,
  TrendingUp,
  HelpCircle,
  Info,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Award,
  MessageSquare,
  Send,
} from "lucide-react";

const UserTabs = ({ userId, support }) => {
  const [activeTab, setActiveTab] = useState("about");

  // Store userId for future API calls or dynamic content
  const currentUserId = userId;

  const tabs = [
    {
      id: "about",
      label: "About",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "activity",
      label: "Activity",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "support",
      label: "Support",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  const tabClass = (tab) =>
    `flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
      activeTab === tab
        ? "bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white shadow-lg transform scale-105"
        : "bg-white/70 text-gray-600 hover:bg-white hover:text-[#4F46E5] hover:shadow-md hover:-translate-y-0.5 border border-white/20"
    }`;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={tabClass(tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 min-h-[300px]">
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#4F46E5] to-purple-600 rounded-xl flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                About This Member
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    User ID
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {currentUserId || "Not specified"}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Join Date
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    January 2024
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Department
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    Development Team
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Role
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    Senior Developer
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl">
              <div className="text-sm font-semibold text-gray-600 mb-2">
                Bio
              </div>
              <p className="text-gray-700 leading-relaxed">
                This user is an integral part of our internal staff database and
                contributes significantly to our team's success. They
                demonstrate excellent collaboration skills and consistently
                deliver high-quality work.
              </p>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Recent Activity
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  action: "Completed Project Alpha",
                  time: "2 hours ago",
                  type: "success",
                },
                {
                  action: "Updated team documentation",
                  time: "5 hours ago",
                  type: "info",
                },
                {
                  action: "Attended team meeting",
                  time: "1 day ago",
                  type: "neutral",
                },
                {
                  action: "Submitted weekly report",
                  time: "2 days ago",
                  type: "success",
                },
                {
                  action: "Collaborated on new feature",
                  time: "3 days ago",
                  type: "info",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl border border-white/20"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "success"
                        ? "bg-emerald-500"
                        : activity.type === "info"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {activity.action}
                    </div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "support" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <HelpCircle size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Support Information
              </h3>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              {support ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      Support Message
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {support.text}
                    </p>
                  </div>
                  {support.url && (
                    <div>
                      <div className="text-sm font-semibold text-gray-600 mb-2">
                        Support Link
                      </div>
                      <a
                        href={support.url}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white font-semibold rounded-xl hover:from-[#4F46E5]/90 hover:to-purple-600/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Support Page
                        <Send size={16} />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HelpCircle size={32} className="text-gray-400" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    No Support Data
                  </h4>
                  <p className="text-gray-600">
                    Support information is currently unavailable for this user.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTabs;
