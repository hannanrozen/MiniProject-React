import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RegisterSVG from "../assets/icons/register.svg";
import GoogleIcon from "../assets/icons/google.svg";
import FacebookIcon from "../assets/icons/facebook.svg";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/register", {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("loginStatusChanged"));
        setSuccess("Registrasi berhasil!");
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }
    } catch (error) {
      console.error("Register error:", error);
      setError(error.response?.data?.error || "Gagal melakukan registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen grid lg:grid-cols-2 grid-cols-1">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12">
          <div className="max-w-lg text-white text-center">
            {/* Hero Content */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Join Thousands of Users
              </h2>
              <p className="text-xl text-indigo-100 leading-relaxed">
                Create your account and start your journey with our amazing
                platform.
              </p>
            </div>

            {/* Illustration */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <img
                src={RegisterSVG}
                alt="Register Illustration"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Advanced Analytics Dashboard</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Real-time Collaboration Tools</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Secure Data Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Illustration */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 mb-6">
                <img
                  src={RegisterSVG}
                  alt="Register Illustration"
                  className="w-32 h-32 mx-auto"
                />
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h1>
              <p className="text-gray-600">It's free and easy</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail or phone number
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your e-mail or phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be 8 characters at least
                </p>
              </div>

              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  By creating an account means you agree to the{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-700">
                    Terms and Conditions
                  </a>
                  , and our{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-700">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or do it via other accounts
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <img src={FacebookIcon} alt="Facebook" className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Login Here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
