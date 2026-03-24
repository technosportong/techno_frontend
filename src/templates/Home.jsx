import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Shirt,
  Zap,
  Footprints,
  Backpack,
  Activity,
  Star,
  Globe,
  Coffee,
  Shield,
} from "lucide-react";

// 🔥 Container Animation (stagger)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// 🔥 Fade Up Animation
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-[#0B1F3A] via-[#0F2A4A] to-black text-white">
      {/* 🔥 HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Elevate Your Game with{" "}
            <span className="text-orange-400 drop-shadow-lg">Technosports</span>
          </h1>
          <p className="mt-5 text-gray-300 text-lg">
            Premium sportswear designed for comfort, performance, and style.
          </p>
          <div className="mt-8 flex gap-4">
           <button className="border border-orange-400 text-orange-400 px-6 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition">
              Techno Sports
            </button>
            <Link to='/items' className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition">
               Explore
            </Link>
           
          </div>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          src="home1.jpg"
          alt="sportswear"
          className="flex-1 rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
        />
      </section>

      {/* 🔥 FEATURES */}
      <section className="bg-white text-gray-800 py-20 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-6">
          {/* 🔥 TITLE */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-4xl font-bold text-center mb-12 text-[#0B1F3A]"
          >
            Why Choose Technosports
          </motion.h2>

          {/* 🔥 FEATURES GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-10 mb-16"
          >
            <Feature icon={<Shirt />} title="Premium Fabric" desc="Breathable and lightweight comfort." />
            <Feature icon={<Zap />} title="High Performance" desc="Built for durability and flexibility." />
            <Feature icon={<ShoppingBag />} title="Trendy Designs" desc="Modern and stylish sportswear." />
          </motion.div>

          {/* 🔥 PRODUCTS TITLE */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-4xl font-bold text-center mb-12 text-[#0B1F3A]"
          >
            Our Products
          </motion.h2>

          {/* 🔥 PRODUCTS GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            <Feature icon={<Shirt />} title="T-Shirts" desc="Comfort wear" />
            <Feature icon={<Activity />} title="Tracks" desc="Training wear" />
            <Feature icon={<Zap />} title="Shorts" desc="Active shorts" />
            <Feature icon={<Footprints />} title="Shoes" desc="Running shoes" />
            <Feature icon={<Backpack />} title="Caps" desc="Sport caps" />
            <Feature icon={<Star />} title="Inners" desc="Comfortable inners" />
            <Feature icon={<Globe />} title="Jackets" desc="Winter jackets" />
            <Feature icon={<Coffee />} title="Hoodies" desc="Casual hoodies" />
            <Feature icon={<Shield />} title="Socks" desc="Sports socks" />
            <Feature icon={<ShoppingBag />} title="Accessories" desc="Sport accessories" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// 🔥 FEATURE CARD
const Feature = ({ icon, title, desc }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.08, rotate: 1 }}
      className="relative p-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg text-center cursor-pointer overflow-hidden group"
    >
      {/* 🔥 Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/30 to-orange-400/0 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />
      <div className="relative z-10">
        <div className="text-orange-500 mb-3 flex justify-center text-3xl">{icon}</div>
        <h3 className="font-bold text-lg text-[#0B1F3A]">{title}</h3>
        <p className="text-gray-500 mt-2 text-sm">{desc}</p>
      </div>
    </motion.div>
  );
};