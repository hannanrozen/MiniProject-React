import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = { email, password };

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const res = await axios.post(`https://reqres.in${endpoint}`, payload);

      if (isLogin) {
        localStorage.setItem("accessToken", res.data.token);
        setSuccess("Login berhasil!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setSuccess("Register berhasil! Silakan login.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" bg-gray-100 flex justify-center items-center  mx-auto my-auto min-h-screen">
      <div className="flex flex-col gap-4 max-w-md w-full bg-white rounded-lg border border-black shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form className="gap-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            don't have an account yet? Register
          </Link>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Email: eve.holt@reqres.in</p>
          <p className="text-xs text-gray-500">Password: cityslicka</p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
