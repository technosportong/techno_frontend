import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Info,
  Package,
  PlusCircle,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
} from "lucide-react";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0B1F3A] text-white shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap p-4 items-center justify-between">

          {/* 🔷 Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <img src="technologo.jpg" className="w-10 h-10 rounded-xl" alt="logo" />
            <span className="text-xl font-bold text-orange-400">Techno Sport</span>
          </motion.div>

          {/* 🔗 Nav Links */}
          <nav className="flex items-center gap-6 text-white font-medium">

            <NavItem to="/" icon={<Home size={18} />} label="Home" />
            <NavItem to="/about" icon={<Info size={18} />} label="About" />
            <NavItem to="/items" icon={<Package size={18} />} label="Items" />

            {/* ✅ Extra links visible only when logged in */}
            {user ? (
              <>
                <NavItem to="/add" icon={<PlusCircle size={18} />} label="Add Item" />
                {/* <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" /> */}
                <NavItem to="/dashboard" icon={<User size={18} />} label="Profile" />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </motion.button>
              </>
            ) : (
              <NavItem to="/login" icon={<LogIn size={18} />} label="Login" />
            )}

          </nav>
        </div>
      </motion.header>
      <hr className="bg-white" />
    </>
  );
};

// 🔥 Reusable Nav Item Component
const NavItem = ({ to, icon, label }) => {
  return (
    <motion.div whileHover={{ y: -2 }} className="transition">
      <Link
        to={to}
        className="flex items-center gap-1 hover:text-orange-400 transition"
      >
        {icon}
        {label}
      </Link>
    </motion.div>
  );
};

export default Header;