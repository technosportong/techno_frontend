import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Layers, Tag, Image as ImageIcon } from "lucide-react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const res = await axios.get("https://techno-backend-idyr.onrender.com/items/get");
      setItems(res.data);
    } catch (err) {
      console.error(err);
      showNotification("❌ Failed to fetch items", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading items...</p>;

  // Group items by type
  const itemsByType = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#0B1F3A] via-[#0F2A4A] to-black px-6 py-10">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg z-50 ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-4xl text-white font-bold mb-8 text-center">
        All Products
      </h2>

      {Object.keys(itemsByType).map((type) => (
        <div key={type} className="mb-12  max-w-7xl mx-auto">
          <h3 className="text-2xl  text-white font-semibold mb-6">{type}</h3>

          <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {itemsByType[type].map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 cursor-pointer transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Tag size={20} /> {item.title}
                    </h3>

                    <p className="text-gray-300 flex items-center gap-2">
                      <Layers size={18} /> Model: {item.model}
                    </p>

                    <p className="text-gray-300 flex items-center gap-2">
                      <DollarSign size={18} /> Price: ${item.price}
                    </p>

                    <p className="text-gray-300 flex items-center gap-2">
                      <ImageIcon size={18} /> Type: {item.type}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;