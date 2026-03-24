import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Layers, Tag, Image as ImageIcon, Search, Trash2, Edit2, Plus } from "lucide-react";
import axios from "axios";
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";

const ItemsAdd = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", model: "", price: "", type: "", image: "" });
  const navigate = useNavigate();

  // Fetch items
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

  useEffect(() => { fetchItems(); }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://techno-backend-idyr.onrender.com/items/delete/${id}`);
      setItems(items.filter(i => i.id !== id));
      showNotification("🗑 Item deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("❌ Failed to delete item", "error");
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
  };

  // Add / Update item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.model || !formData.price || !formData.type || !formData.image) {
      showNotification("⚠️ Please fill all fields", "error");
      return;
    }

    try {
      if (editingItem) {
        await axios.put(`https://techno-backend-idyr.onrender.com/items/update/${editingItem.id}`, formData);
        setItems(items.map(i => (i.id === editingItem.id ? formData : i)));
        showNotification("✏️ Item updated successfully", "success");
      } else {
        const res = await axios.post("https://techno-backend-idyr.onrender.com/items/add", formData);
        setItems([...items, res.data]);
        showNotification("✅ Item added successfully", "success");
      }
      setEditingItem(null);
      setFormData({ title: "", model: "", price: "", type: "", image: "" });
    } catch (err) {
      console.error(err);
      showNotification("❌ Failed to save item", "error");
    }
  };

  // Add to billing (exclude image)
  const handleAddToBilling = (item) => {
    const billingItem = {
      title: item.title,
      model: item.model,
      price: item.price,
      type: item.type
    };
    const existing = JSON.parse(localStorage.getItem("billingItems") || "[]");
    localStorage.setItem("billingItems", JSON.stringify([...existing, billingItem]));
    showNotification(`💰 "${item.title}" added to billing`, "success");
    // navigate("/billing"); // redirect to billing page automatically
  };

  if (loading) return <p className="text-white text-center mt-10">Loading items...</p>;

  const filteredItems = search
    ? items.filter(i => i.model.toLowerCase().includes(search.toLowerCase()))
    : items;

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0B1F3A] via-[#0F2A4A] to-black text-white">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg z-50 ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="mb-6 flex items-center gap-2 max-w-md mx-auto">
          <Search className="text-gray-300" />
          <input
            type="text"
            placeholder="Search by model..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Items Grid */}
        {Object.keys(groupedItems).map(type => (
          <div key={type} className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{type}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <AnimatePresence>
                {groupedItems[type].map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 transition"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-4 space-y-2">
                      <h3 className="text-xl font-bold flex items-center gap-2"><Tag size={20} /> {item.title}</h3>
                      <p className="text-gray-300 flex items-center gap-2"><Layers size={18} /> Model: {item.model}</p>
                      <p className="text-gray-300 flex items-center gap-2"><DollarSign size={18} /> Price: ${item.price}</p>
                      <p className="text-gray-300 flex items-center gap-2"><ImageIcon size={18} /> Type: {item.type}</p>

                      {/* Edit/Delete Buttons */}
                      <div className="flex gap-2 mt-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(item)}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-2 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                        >
                          <Edit2 size={18} /> Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                        >
                          <Trash2 size={18} /> Delete
                        </motion.button>
                      </div>

                      {/* Add to Billing */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToBilling(item)}
                        className="mt-3 w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-3"
                      >
                        <Plus size={20} /> Add to Billing
                      </motion.button>

                      {/* Full Form for Editing */}
                      {editingItem && editingItem.id === item.id && (
                        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 p-3 bg-white/10 rounded-xl">
                          <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="p-2 rounded-xl bg-white/20 text-white outline-none" />
                          <input type="text" placeholder="Model" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="p-2 rounded-xl bg-white/20 text-white outline-none" />
                          <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="p-2 rounded-xl bg-white/20 text-white outline-none" />
                          <input type="text" placeholder="Type" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="p-2 rounded-xl bg-white/20 text-white outline-none" />
                          <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="p-2 rounded-xl bg-white/20 text-white outline-none" />
                          <div className="flex gap-2 mt-2">
                            <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 py-2 rounded-xl font-semibold">Save</button>
                            <button type="button" onClick={() => setEditingItem(null)} className="flex-1 bg-gray-500 hover:bg-gray-600 py-2 rounded-xl font-semibold">Cancel</button>
                          </div>
                        </form>
                      )}

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ItemsAdd;