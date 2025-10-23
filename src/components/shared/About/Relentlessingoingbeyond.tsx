/* eslint-disable react/no-unescaped-entities */
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

const Relentlessingoingbeyond: React.FC = () => {
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
      className="py-24 px-4 sm:px-8 md:px-12 lg:px-24 bg-black text-white text-gray-800 font-sans overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <motion.p
          className="text-4xl font-light uppercase tracking-widest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          RELENT LESS IN GOING BEYOND
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

            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.9, ease: easeOut }}
            >
              Creed Group, founded in 1996, is a real estate investment company
              with extensive experience in Japan's mature real estate market.
              Indonesia, Bangladesh, the Philippines, and Myanmar's expanding
              real estate markets since 2012, with a gross development value of
              over USD 800 million to date. Creed Group is concentrating its
              operations in Southeast Asia, with a strategy to work with the
              best in the industry and bring Japanese quality and knowledge to
              the region.
            </motion.p>
            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.9, ease: easeOut }}
            >
              The logo defines our philosophy. Beyond bonding explains our
              allegiance to our clients. The only way we can advance forward is
              their dreams are brought into reality. We go above and beyond to
              provide an elegant solution to their requirements and only stop
              when we achieve to see their smiles.
            </motion.p>

            
          </div>

   
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

        
        </div>
      </div>
    </motion.div>
  );
};

export default Relentlessingoingbeyond;
