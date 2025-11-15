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
    <div className="">
      <div className="bg-black text-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse md:gap-10 items-stretch">
          <motion.div
            className="lg:w-1/2 pr-0 lg:pr-16 flex flex-col  gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {/* Main Content Paragraphs */}
            <motion.div className=" text-base" variants={fadeUp}>
              <p>
                Chairman’s Message : At Assist Holdings Limited, we believe that
                real estate is more than land and buildings — it’s about
                building dreams, securing futures, and creating lasting
                value.From our very beginning, our goal has been to offer
                reliable, transparent, and innovative property solutions that
                empower people and strengthen communities. Our success is built
                on integrity, professionalism, and a deep commitment to our
                clients. As we move forward, we remain focused on expanding our
                services, improving customer experience, and contributing to the
                sustainable growth of our nation’s real estate sector.Together,
                we are not just developing properties — we are developing trust.
                <br />
                <br />
                Chairman, Assist Holdings Limited
              </p>
            </motion.div>

            {/* Quote Section */}
            <motion.div className="" variants={fadeUp}>
              <p className="text-lg  ">Engr.Ruhul Amin</p>
              <p className="text-sm">Chairman</p>
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
              src="https://i.postimg.cc/k4pCYWyj/Md-Ruhul-Amin.jpg"
              alt="Green Living and Rooftop Garden"
              className="w-full  object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      <div className="bg-black text-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row md:gap-10 items-stretch">
          <motion.div
            className="lg:w-1/2 pr-0 lg:pr-16 flex flex-col  gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {/* Main Content Paragraphs */}
            <motion.div className=" text-base" variants={fadeUp}>
              <p>
                At Assist Holdings Limited, our mission is to make land
                ownership simple, secure, and profitable. We have built our
                reputation on trust, quality, and commitment — values that
                continue to guide us as we expand our footprint in the real
                estate market. Our focus remains on transparency, client
                satisfaction, and sustainable development. We are continuously
                improving our services, technology, and processes to meet the
                evolving needs of our valued clients and investors. We look
                forward to welcoming you to our growing family of satisfied
                landowners and investors.
                <br />
                <br />
                Managing Director, Assist Holdings Limited
              </p>
            </motion.div>

            {/* Quote Section */}
            <motion.div className="" variants={fadeUp}>
              <p className="text-lg  ">Mohammed Tohidur Rahman </p>
              <p className="text-sm">Managing Director</p>
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
              src="https://i.postimg.cc/wxL4GhFM/481247081-2995625383945511-6279249194017499974-n.jpg"
              alt="Green Living and Rooftop Garden"
              className="w-full  object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      <div className="bg-black text-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse md:gap-10 items-stretch">
          <motion.div
            className="lg:w-1/2 pr-0 lg:pr-16 flex flex-col  gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {/* Main Content Paragraphs */}
            <motion.div className=" text-base" variants={fadeUp}>
              <p>
                Welcome to Assist Holdings Limited. Our company was founded on a
                vision to redefine real estate by combining modern development
                strategies with genuine care for our clients. Every project we
                undertake reflects our promise — to deliver quality,
                transparency, and long-term value. As CEO, I take pride in
                leading a team that is passionate about creating opportunities
                for investment and home ownership. We are dedicated to providing
                exceptional service and ensuring every client finds not just
                property, but peace of mind. Together, let’s build a future
                where every investment grows with confidence.
              </p>
            </motion.div>

            {/* Quote Section */}
            <motion.div className="" variants={fadeUp}>
              <p className="text-lg  ">Ziaur Rahman </p>
              <p className="text-sm">Director & CEO</p>
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
              src="https://i.postimg.cc/HLb7gsKD/Whats-App-Image-2025-11-08-at-11-10-17-7478152d.jpg"
              alt="Green Living and Rooftop Garden"
              className="w-full  object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About2;
