import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone } from "lucide-react";
import Sidebar from './Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#0B1F3A] text-white">

      {/* 🔹 Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* 🔹 Main Content */}
      <div className="flex-1 flex items-center justify-center p-8 ml-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-5 bg-white/10 p-6 rounded-2xl backdrop-blur-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">User Profile 👋</h2>

          {/* Username */}
          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
            <User className="text-orange-400" />
            <div>
              <p className="text-gray-300 text-sm">Username</p>
              <h3 className="text-lg font-semibold">{user?.username}</h3>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
            <Phone className="text-green-400" />
            <div>
              <p className="text-gray-300 text-sm">Mobile</p>
              <h3 className="text-lg font-semibold">{user?.mobile || "N/A"}</h3>
            </div>
          </div>

          {/* Email */}
          {user?.email && (
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
              <User className="text-blue-400" />
              <div>
                <p className="text-gray-300 text-sm">Email</p>
                <h3 className="text-lg font-semibold">{user.email}</h3>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;