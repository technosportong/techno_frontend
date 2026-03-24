import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://techno-backend-idyr.onrender.com/user/login", {
        username,
        password,
      });

      if (!res.data.user) throw new Error("User not received");

      // ✅ Update App state
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Login Successful");
      navigate("/Dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A] px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#0F2A4A] p-8 rounded-3xl shadow-2xl text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login 👋</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full pl-10 py-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* SUBMIT BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 py-3 rounded-xl font-semibold text-white shadow-lg transition"
          >
            {loading ? "Loading..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;