/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  Variants,
  easeOut,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const OurAscendance: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // 🪶 Smooth damping effect
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 80,
    stiffness: 80,
    mass: 0.3,
  });

  // 🎞️ Transform mapping: scroll speed অনুযায়ী translate হবে
  const moveY = useTransform(smoothVelocity, [-1000, 1000], [100, -100]);
  const imgMove1 = useTransform(smoothVelocity, [-1000, 1000], [60, -60]);
  const imgMove2 = useTransform(smoothVelocity, [-1000, 1000], [-60, 60]);
  const imgMove3 = useTransform(smoothVelocity, [-1000, 1000], [80, -80]);

  // ✨ Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ y: moveY }}
      className="py-24 px-4 sm:px-8 md:px-12 lg:px-24 bg-white text-gray-800 font-sans overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <motion.p
          className="text-3xl font-light uppercase tracking-widest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          OUR ASCENDANCE
        </motion.p>
        <motion.div
          className="mx-auto mt-2 h-0.5 w-24 bg-red-600"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col justify-between space-y-8">
          <div>
            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              JCX Developments Ltd embarked on the Real Estate journey with the
              commitment to bring contemporary design and develop large-scale
              Residential, Commercial, and Condominium projects in Bangladesh
              with Japanese collaboration and experience.
            </motion.p>

            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.9, ease: easeOut }}
            >
              We will strive to deliver precise, exquisite solutions to our
              client&apos;s wishes and requirements so that their aspirations
              become a reality. This will be accomplished by introducing
              state-of-the-art innovative Japanese technologies with the
              partnership with Creed Group from Japan.
            </motion.p>

            <motion.a
              href="#"
              className="inline-flex items-center text-blue-800 hover:text-blue-600 transition-colors duration-300 font-semibold text-lg group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.4, duration: 0.9, ease: easeOut }}
            >
              READ MORE
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </motion.a>
          </div>

          {/* Bottom Image */}
          <motion.div style={{ y: imgMove1 }} className="w-full mt-10">
            <img
              src="https://jcxbd.com/wp-content/uploads/2022/11/Our-ascendence-1.jpg"
              alt="JCX Developments"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-5 relative">
          <motion.div style={{ y: imgMove2 }} className="col-span-1 mt-8">
            <img
              src="https://jcxbd.com/wp-content/uploads/2024/04/Our-ascendence-4-v2.jpg"
              alt="Building 1"
              className="w-full h-[380px] object-cover rounded-lg shadow-md"
            />
          </motion.div>

          <motion.div style={{ y: imgMove3 }} className="col-span-1">
            <img
              src="https://jcxbd.com/wp-content/uploads/2024/04/Our-ascendence-3-v2.jpg"
              alt="Building 2"
              className="w-full h-[450px] object-cover rounded-lg shadow-md"
            />
          </motion.div>

          <motion.div style={{ y: imgMove1 }} className="col-span-2">
            <img
              src="https://jcxbd.com/wp-content/uploads/2024/04/Our-ascendence-2-v2.jpg"
              alt="Modern Architecture"
              className="w-full h-[420px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurAscendance;
