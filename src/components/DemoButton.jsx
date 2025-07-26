import React, { useState } from "react";
import DemoPopup from "./DemoPopup";
import { User } from "lucide-react";

const DemoButton = ({ type, onDemoData }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDemoData = (data) => {
    onDemoData(data);
  };

  return (
    <>
      {/* Demo Button - Positioned absolutely at bottom right */}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 z-40 group bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        <User className="w-5 h-5" />
        <span className="font-semibold">Account Demo</span>

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-[#4F46E5] opacity-30 animate-ping"></div>
      </button>

      {/* Popup */}
      <DemoPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type={type}
        onCopyData={handleDemoData}
      />
    </>
  );
};

export default DemoButton;
