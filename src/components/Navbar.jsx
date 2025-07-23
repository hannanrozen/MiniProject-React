import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoImg from "../assets/icons/llogo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if current page is auth page
  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Navbar: Current token:", token);
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      console.log("Navbar: Token changed:", token);
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("loginStatusChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStatusChanged", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("loginStatusChanged"));
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleMobileNavigation = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const featuresSection = document.getElementById("features");
        if (featuresSection) {
          featuresSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handlePricingClick = (e) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const pricingSection = document.getElementById("pricing");
        if (pricingSection) {
          pricingSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // If it's an auth page, show minimal navbar with centered logo
  if (isAuthPage) {
    return (
      <nav className="flex justify-center items-center py-4 px-6 md:px-12 shadow-sm bg-white fixed w-full z-10">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src={LogoImg} alt="Staffinity Logo" className="h-8 w-auto" />
        </div>
      </nav>
    );
  }

  // Regular navbar for non-auth pages
  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 shadow-sm bg-white fixed w-full z-10">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <img src={LogoImg} alt="Staffinity Logo" className="h-8 w-auto" />
      </div>

      {!isLoggedIn ? (
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
          <li>
            <button
              onClick={handleFeaturesClick}
              className="hover:text-indigo-600 transition-colors"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={handlePricingClick}
              className="hover:text-indigo-600 transition-colors"
            >
              Pricing
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-200"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-200"
            >
              Register
            </button>
          </li>
        </ul>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 font-medium hover:text-indigo-500 transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            Logout
          </button>
        </div>
      )}

      <button
        className="md:hidden flex flex-col gap-1 p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="w-6 h-0.5 bg-gray-700"></span>
        <span className="w-6 h-0.5 bg-gray-700"></span>
        <span className="w-6 h-0.5 bg-gray-700"></span>
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={handleFeaturesClick}
                  className="text-gray-700 hover:text-indigo-600 text-left"
                >
                  Features
                </button>
                <button
                  onClick={handlePricingClick}
                  className="text-gray-700 hover:text-indigo-600 text-left"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleMobileNavigation("/login")}
                  className="px-4 py-2 border border-indigo-500 text-indigo-600 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => handleMobileNavigation("/register")}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 text-gray-700 font-medium hover:text-indigo-500 transition-colors duration-200 w-full py-2 group"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
