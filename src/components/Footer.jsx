import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B1F3A] text-gray-300 pt-12 pb-6">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* 🔥 BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Technosport <span className="text-orange-400">Ongole</span>
          </h2>
          <p className="text-gray-400">
            Premium sportswear store delivering performance, comfort, and
            modern style for everyone.
          </p>
        </div>

        {/* 🔗 QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-orange-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-orange-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/items" className="hover:text-orange-400 transition">
                Products
              </a>
            </li>
          </ul>
        </div>

        {/* 📍 STORE INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Store Info
          </h3>

          <div className="space-y-3 text-sm">

            <p className="flex items-start gap-2">
              <MapPin size={18} className="text-orange-400 mt-1" />
              37-1-17, Trunk Rd, Santhapet, Ongole  
              <br /> Near Addanki Bus Stand
            </p>

            <p className="flex items-center gap-2">
              <Clock size={18} className="text-orange-400" />
              10:00 AM – 10:00 PM (All Days)
            </p>

            <p className="flex items-center gap-2">
              <Phone size={18} className="text-orange-400" />
              <a href="tel:9876543210" className="hover:text-white">
                9876543210
              </a>
            </p>

          </div>
        </div>

        {/* 📲 SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>

          <div className="flex flex-col gap-3">

            <a
              href="https://www.instagram.com/technosport_ongole/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-orange-400 transition"
            >
              <Instagram size={18} /> Instagram
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-orange-400 transition"
            >
              <MessageCircle size={18} /> WhatsApp Chat
            </a>

            <a
              href="https://share.google/bxcYu3XBmlQRblI2M"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-orange-400 transition"
            >
              <MessageCircle size={18} /> WhatsApp Group
            </a>

          </div>
        </div>

      </div>

      {/* 🔥 BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Technosport Ongole. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;