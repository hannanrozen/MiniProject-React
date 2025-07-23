import React from "react";
import { useNavigate } from "react-router-dom";
import Back from "../assets/icons/back.svg";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/home")}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <img src={Back} alt="Back" className="w-5 h-5" />
      Back to Home
    </button>
  );
};

export default BackButton;
