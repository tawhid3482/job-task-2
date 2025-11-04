/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

const About2: React.FC = () => {
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
    <div className="bg-black text-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse md:gap-10 items-stretch">
        <motion.div
          className="lg:w-1/2 pr-0 lg:pr-16 flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {/* Main Content Paragraphs */}
          <motion.div className=" space-y-6 text-base" variants={fadeUp}>
            <p>
              Mr. Md. Iqbal Hossain Chowdhury comes of a reputed Muslim family
              of Lakshipur. He has graduated from Dhaka College followed by an
              MBA from South East University. He is the Director in the Board of
              Directors of Bengal Commercial Bank Limited representing B. Dash
              Japan Co. Ltd. Mr. Chowdhury is well known as one of the
              established Real Estate business personalities of the country. He
              is the Managing Director of renowned Assist-holdings-limited Development Ltd and JCX
              Trading Ltd. He has played a great role in the industry by earning
              FDI (Foreign Direct Investment) through joint venture business
              enterprise with Japanese CREED Group, which is the ever first of
              its kind.
            </p>
          </motion.div>
          <motion.div className="mt-2 space-y-6 text-base" variants={fadeUp}>
            <p>
              Mr. Md. Iqbal Hossain Chowdhury is successfully running a business
              Conglomerate with diversified interests in Energy, Auto Mobiles,
              Tourism and Hospitality sector. He is also Director of Bengal Life
              Insurance Company Ltd, Moonlight Shipping, Napier Homes Ltd and
              JAPASTY Co. Ltd. Mr. Md. Iqbal Hossain Chowdhury is also the
              Director of one the most popular restaurants in Dhaka named The
              Rio-Lounge and Brew Splash. Mr. Chowdhury is involved in many
              social activities and widely acclaimed for his philanthropic
              contributions to the society. He is Director of Federation of
              Bangladesh Chambers of Commerce and Industry (FBCCI). He is also
              the Vice Chairman of Bashundhara Kings Football Team, Member of
              SAARC Chamber of Commerce and Industry (SCCI), Member of Japan
              Bangladesh Chamber of Commerce and Industry (JBCCI).
            </p>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            className="mt-12 lg:mt-24 pl-4"
            variants={fadeUp}
          >
            <p className="text-lg  ">
              Md. Iqbal Hossain Chowdhury
            </p>
              <p className="text-sm"> Managing Director</p>
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
            src="https://jcxbd.com/wp-content/uploads/2021/11/JCX-MD.webp" 
            alt="Green Living and Rooftop Garden"
            className="w-full  object-cover shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default About2;
