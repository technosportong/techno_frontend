import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  MessageCircle,
  Navigation,
  Users,
} from "lucide-react";

// 🔥 Animation
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0F2A4A] to-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold">
            About{" "}
            <span className="text-orange-400 drop-shadow-lg">
              Technosport Ongole
            </span>
          </h1>

          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Premium sportswear store delivering performance, comfort, and style
            for every athlete and fitness enthusiast.
          </p>
        </motion.div>

        {/* 🔥 INFO CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* 📍 LOCATION */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition"
          >
            <MapPin className="text-orange-400 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Our Location</h3>
            <p className="text-gray-300">
              37-1-17, Trunk Rd, near Andhra Brahmana mess,
              Santhapet, Ongole, Andhra Pradesh 523001
            </p>
            <p className="text-gray-400 mt-2">
              Near Nellore Bus Stand
            </p>
          </motion.div>

          {/* ⏰ TIMINGS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition"
          >
            <Clock className="text-orange-400 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Store Timings</h3>
            <p className="text-gray-300">Open All Days</p>
            <p className="text-gray-400">10:00 AM – 10:00 PM</p>
          </motion.div>

          {/* 📞 CONTACT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition"
          >
            <Phone className="text-orange-400 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <a
              href="tel:9392208806"
              className="text-blue-400 font-semibold"
            >
              9392208806
            </a>
          </motion.div>

          {/* 👥 COMMUNITY */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition"
          >
            <Users className="text-orange-400 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-300">
              Join our WhatsApp group for latest offers & updates.
            </p>
          </motion.div>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="mt-16 grid md:grid-cols-3 gap-6"
        >

          {/* WhatsApp Chat */}
          <a
            href="https://wa.me/9392208806"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-4 rounded-2xl shadow-xl transition hover:scale-105"
          >
            <MessageCircle /> WhatsApp Chat
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/technosport_ongole/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-4 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            <Instagram /> Instagram
          </a>

          {/* Directions */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Technosport+Ongole"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-4 rounded-2xl shadow-xl transition hover:scale-105"
          >
            <Navigation /> Directions
          </a>

        </motion.div>

        {/* 🔥 WHATSAPP GROUP */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="mt-10 text-center"
        >
          <a
            href="https://chat.whatsapp.com/DW86T7JybmfH36vUKxKcGj?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl shadow-xl text-lg transition hover:scale-105"
          >
            Join WhatsApp Group
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
