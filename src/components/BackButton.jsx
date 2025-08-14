import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ to = "/home" }) => {
  const navigate = useNavigate();

  return (
    <button
      data-testid="back-button"
      onClick={() => navigate(to)}
      className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl hover:bg-white hover:text-[#4F46E5] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20"
    >
      <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#4F46E5]/10 transition-colors duration-300">
        <ArrowLeft
          size={20}
          className="text-gray-600 group-hover:text-[#4F46E5] group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <span className="font-semibold">Back to Home</span>
    </button>
  );
};

export default BackButton;
