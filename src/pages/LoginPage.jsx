import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import loginImage from "../assets/icons/login.svg";
import api from "../services/api";
import DemoButton from "../components/DemoButton";
import GoogleIcon from "../assets/icons/google.svg";
import FacebookIcon from "../assets/icons/facebook.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleDemoData = (demoData) => {
    setEmail(demoData.email);
    setPassword(demoData.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("loginStatusChanged"));
        setSuccess("Login berhasil!");
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.error || "Email atau password tidak valid"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="min-h-screen grid lg:grid-cols-2 grid-cols-1">
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#4F46E5] via-blue-600 to-purple-600 p-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          <div className="max-w-lg text-white text-center relative z-40">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <User size={32} className="text-white" />
              </div>
              <h2 className="text-5xl font-black mb-6 leading-tight">
                Welcome Back to
                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Staffinity
                </span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed font-medium mb-8">
                Login to manage your team, track users, and access all premium
                features in one centralized dashboard.
              </p>

              <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
                <img
                  src={loginImage}
                  alt="Login Illustration"
                  className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 lg:p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-blue-50/30 lg:hidden"></div>

          <div className="w-full max-w-md relative z-40">
            <div className="lg:hidden text-center mb-12">
              <div className="inline-block bg-gradient-to-br from-[#4F46E5] to-purple-600 rounded-3xl p-8 mb-8 shadow-2xl">
                <User size={64} className="text-white" />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#4F46E5] to-purple-600 rounded-2xl mb-4">
                  <User size={24} className="text-white" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-3">
                  Welcome Back
                </h1>
                <p className="text-gray-600 font-medium">
                  Sign in to your account and continue your journey
                </p>
              </div>

              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-4 rounded-2xl mb-6 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 px-4 py-4 rounded-2xl mb-6 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    E-mail or phone number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Type your e-mail or phone number"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Type your password"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-gray-300 rounded transition-colors duration-200"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-700 font-medium"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-[#4F46E5] hover:text-[#4F46E5]/80 transition-colors duration-200"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#4F46E5] to-purple-600 hover:from-[#4F46E5]/90 hover:to-purple-600/90 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="w-full inline-flex justify-center items-center py-3 px-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm text-sm font-medium text-gray-600 hover:bg-white/80 hover:shadow-md transition-all duration-200 group">
                    <img
                      src={GoogleIcon}
                      alt="Google"
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="ml-2">Google</span>
                  </button>
                  <button className="w-full inline-flex justify-center items-center py-3 px-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm text-sm font-medium text-gray-600 hover:bg-white/80 hover:shadow-md transition-all duration-200 group">
                    <img
                      src={FacebookIcon}
                      alt="Facebook"
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="ml-2">Facebook</span>
                  </button>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-[#4F46E5] hover:text-[#4F46E5]/80 font-semibold transition-colors duration-200"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoButton type="login" onDemoData={handleDemoData} />
    </div>
  );
};

export default LoginPage;
