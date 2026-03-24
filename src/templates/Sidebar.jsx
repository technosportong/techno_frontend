import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PlusCircle, CreditCard, BarChart2,Package } from "lucide-react";

const Sidebar = ({ handleLogout }) => {
  const tabs = [
    { to: "/add", icon: <PlusCircle />, label: "Add Item" },
    { to: "/itemsadd", icon: <Package />, label: "Items" },
    { to: "/billing", icon: <CreditCard />, label: "Billing" },
    { to: "/list", icon: <BarChart2 />, label: "Data" },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 h-screen w-64  text-white p-6 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-orange-400 mb-4">Dashboard</h2>

      {tabs.map((tab) => (
        <motion.div
          key={tab.to}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={tab.to}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-400/30 transition"
          >
            {tab.icon}
            {tab.label}
          </Link>
        </motion.div>
      ))}

      {/* 🔹 Logout at bottom */}
     
    </motion.div>
  );
};

export default Sidebar;