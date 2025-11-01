'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/', color: '#3b5998' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/', color: '#0077b5' },
  { icon: FaYoutube, href: 'https://www.youtube.com/', color: '#ff0000' },
  { icon: FaInstagram, href: 'https://www.instagram.com/', color: '#C13584' },
];

const FixedSocialSidebar: React.FC = () => {
  return (
    // Fixed container on the right side of the screen
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 shadow-2xl hidden lg:block">

      {socialLinks.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#0047AB] border-b border-gray-700 flex items-center justify-center cursor-pointer transition-all duration-300"
            // Set initial state for background (Dark Blue)
            initial={{ backgroundColor: '#0047AB' }}
            // Animate on hover: change color to brand color and scale up slightly
            whileHover={{
              backgroundColor: item.color,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="text-white text-xl" />
          </motion.a>
        );
      })}

      {/* The scroll indicator/decorative bar shown in some screenshots (optional) */}
      {/* <div className="w-12 h-6 bg-[#0047AB] flex items-center justify-center">

      </div> */}

    </div>
  );
};

export default FixedSocialSidebar;