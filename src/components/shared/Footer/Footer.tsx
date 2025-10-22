/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaChevronUp,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  // Footer Link Structure (matching the three columns in the screenshot)
  const footerLinks = [
    [
      { name: "GALLERY", href: "/gallery" },
      { name: "VIDEO", href: "/video" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
    [
      { name: "CAREER", href: "/career" },
      { name: "CSR", href: "/csr" },
      { name: "CONTACT", href: "/contact" },
    ],
    [
      { name: "CONSTRUCTION STATUS", href: "/status" },
      { name: "NEWS & EVENTS", href: "/news" },
    ],
  ];

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-4 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20 border-b border-gray-800 pb-10">
          {footerLinks.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`col-span-1 text-sm text-gray-300 ${
                colIndex === 2 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <ul className="space-y-4">
                {column.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm font-light tracking-wider hover:text-gray-400 transition-colors duration-200 ${
                        link.name === "Privacy Policy"
                          ? "text-sm text-gray-400"
                          : "uppercase"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Empty column for alignment/spacing */}
          <div className="hidden lg:block col-span-1"></div>

          {/* WhatsApp Floating Icon (matching the blue circle in the screenshot) */}
          <div className="absolute  left-4 bottom-4 md:left-12 md:bottom-12 z-50">
            <motion.a
              href="https://wa.me/yourphonenumber" // Replace with your WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="fixed left-4 bottom-4 md:left-12 md:bottom-12 z-50 w-14 h-14 bg-blue-800 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaWhatsapp className="text-white text-3xl" />
            </motion.a>
          </div>
        </div>

        {/* Bottom Section: Copyright, Developer, Social Media, and Scroll Button */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 pt-4">
          {/* Copyright */}
          <p className="mb-4 md:mb-0 text-gray-300">
            © 2025 JCX BD | All Rights Reserved.
          </p>

          {/* Designed & Developed */}
          <p className="mb-4 md:mb-0 text-gray-300">
            Designed & Developed by Dcastalia
          </p>

          {/* Social Media and Scroll Button */}
          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            {/* Facebook */}
            <motion.a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors duration-200"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#3b5998",
                color: "#ffffff",
              }} // Hover to brand color, text to white
            >
              <FaFacebookF className="text-black text-sm" />{" "}
              {/* Default black text */}
            </motion.a>
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors duration-200"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#0077b5",
                color: "#ffffff",
              }}
            >
              <FaLinkedinIn className="text-black text-sm" />
            </motion.a>
            {/* YouTube */}
            <motion.a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors duration-200"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#ff0000",
                color: "#ffffff",
              }}
            >
              <FaYoutube className="text-black text-sm" />
            </motion.a>
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors duration-200"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#C13584",
                color: "#ffffff",
              }}
            >
              <FaInstagram className="text-black text-sm" />
            </motion.a>

            {/* Scroll to Top Button (The upward arrow in the circle) */}
            <motion.button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full sticky text-white   shadow-lg ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-white border border-blue-100 p-4 rounded-3xl text-5xl" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
