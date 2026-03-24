import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Tag, DollarSign, Layers, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import Sidebar from './Sidebar'
const Add = () => {
  const [form, setForm] = useState({
    title: "",
    model: "",
    price: "",
    type: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [notification, setNotification] = useState(null);

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return showNotification("User not logged in", "error");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("model", form.model);
    formData.append("price", form.price);
    formData.append("type", form.type);
    formData.append("userId", user.id);
    formData.append("image", form.image);

    try {
      await axios.post("https://techno-backend-idyr.onrender.com/items/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showNotification("✅ Item Added Successfully", "success");

      // ✅ Reset form and preview
      setForm({ title: "", model: "", price: "", type: "", image: null });
      setPreview(null);
    } catch (err) {
      console.error(err);
      showNotification("❌ Upload Failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1F3A] via-[#0F2A4A] to-black px-4 py-8">
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
          <Sidebar />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl space-y-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-2"
        >
          Add New Product 🚀
        </motion.h2>

        {/* Inputs */}
        <InputField icon={<Tag />} name="title" placeholder="Product Title" value={form.title} onChange={handleChange} />
        <InputField icon={<Layers />} name="model" placeholder="Model Number" value={form.model} onChange={handleChange} />
        <InputField icon={<DollarSign />} name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} />

        {/* Dropdown */}
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <div className="absolute left-3 top-3 text-gray-300">
            <ImageIcon />
          </div>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 text-black outline-none focus:ring-2 focus:ring-orange-400 transition"
          >
            <option value="" disabled>Select Product Type</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Track">Track</option>
            <option value="Shorts">Shorts</option>
            <option value="Shoes">Shoes</option>
            <option value="Caps">Caps</option>
            <option value="Inners">Inners</option>
            <option value="Jackets">Jackets</option>
          </select>
        </motion.div>

        {/* Image Upload */}
        <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-orange-400 transition duration-300"
        >
          <Upload className="text-orange-400 mb-2" size={28} />
          <span className="text-gray-300">Click to Upload Image</span>
          <input type="file" accept="image/*" onChange={handleImage} hidden />
        </motion.label>

        {/* Preview */}
        {preview && (
          <motion.img
            src={preview}
            alt="preview"
            className="w-full h-64 object-cover rounded-xl shadow-lg border-2 border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          Add Product
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Add;

// Controlled InputField Component
const InputField = ({ icon, value, ...props }) => (
  <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
    <div className="absolute left-3 top-3 text-gray-300">{icon}</div>
    <input
      {...props}
      value={value} // ✅ controlled
      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-orange-400 transition"
    />
  </motion.div>
);