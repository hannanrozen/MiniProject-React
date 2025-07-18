import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
import Logout from "../assets/icons/logout.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#020024] via-[#090979] to-[#00d4ff] shadow-lg">
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center py-4 px-6">
          <div className="flex items-center ">
            <img src={Logo} alt="Logo" className="w-34 h-12" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 
                     text-white px-4 py-2 rounded-lg transition-all duration-300 
                     border border-white/20 hover:border-white/40 backdrop-blur-sm"
          >
            <img src={Logout} alt="Logout" className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
