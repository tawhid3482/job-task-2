/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

const GreenLivingSection: React.FC = () => {
  // 📜 Framer Motion Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut, staggerChildren: 0.2 },
    },
  };

  const imageFadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: easeOut },
    },
  };

  return (
    // আপনার স্ক্রিনশট অনুযায়ী সাদা ব্যাকগ্রাউন্ড
    <div className="bg-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch">
        
        {/* ==================== Left Text Section ==================== */}
        <motion.div
          className="lg:w-1/2 pr-0 lg:pr-16 flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {/* Main Title */}
          <motion.div className="mb-10" variants={fadeUp}>
            <h2 className="text-5xl font-extralight text-gray-800 uppercase relative inline-block">
              GREEN LIVING
              {/* Title-এর নিচে নীল আন্ডারলাইন */}
              <span className="absolute left-0 bottom-[-5px] h-0.5 w-1/3 bg-blue-700"></span>
            </h2>
          </motion.div>

          {/* Main Content Paragraphs */}
          <motion.div className="text-gray-600 space-y-6 text-base" variants={fadeUp}>
            <p>
              We think that in every approach towards our continuous advancement towards the future, there should be a positive impact at every turn. Our buildings are hence built future-ready. This is ensured by building our apartments keeping sustainability in mind with proper ventilation, landscaped rooftops, kid-friendly green areas for kids and their families to hang out. Hence our apartments will be the home for generations to come. In the race for positive change, we want to be the leading force.
            </p>
          </motion.div>

          {/* Quote Section */}
          <motion.div className="mt-12 lg:mt-24 border-l-4 border-blue-700 pl-4" variants={fadeUp}>
            <p className="text-xl italic text-gray-800 font-medium">
              "We should attempt to bring nature, houses, and human beings together in a higher unity."
            </p>
            <p className="text-base text-gray-600 mt-2 font-light">
              - Ludwig Mies van der Rohe
            </p>
          </motion.div>
        </motion.div>

        {/* ==================== Right Image Section ==================== */}
        <motion.div
          className="lg:w-1/2 mt-12 lg:mt-0 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={imageFadeIn}
        >
          <img
            src="https://jcxbd.com/wp-content/uploads/2021/11/About-Us-Green-Living.jpg" 
            alt="Green Living and Rooftop Garden"
            className="w-full h-full object-cover shadow-2xl"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default GreenLivingSection;