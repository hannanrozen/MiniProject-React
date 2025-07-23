import React, { useState } from "react";

const UserTabs = ({ support }) => {
  const [activeTab, setActiveTab] = useState("about");

  const tabClass = (tab) =>
    `px-4 py-2 rounded-t-lg ${
      activeTab === tab
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="mt-8">
      <div className="flex gap-2 border-b">
        <button
          className={tabClass("about")}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={tabClass("activity")}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        <button
          className={tabClass("support")}
          onClick={() => setActiveTab("support")}
        >
          Support
        </button>
      </div>

      <div className="p-4 bg-white rounded-b-lg shadow-md border">
        {activeTab === "about" && (
          <p>This user is part of the internal staff database.</p>
        )}
        {activeTab === "activity" && (
          <p>Recent activity data is currently unavailable.</p>
        )}
        {activeTab === "support" && (
          <div>
            <p className="mb-2">{support?.text}</p>
            <a
              href={support?.url}
              className="text-indigo-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {support?.url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTabs;
