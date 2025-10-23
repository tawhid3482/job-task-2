'use client'

import React from 'react';
import { motion, Variants } from 'framer-motion';

// Framer Motion variants for staggered entry
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the title animations
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ContactInfo: React.FC = () => {
  return (
    <motion.section
      className="bg-black text-white py-16 px-4 md:px-10 lg:px-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Animate when 20% visible
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 lg:gap-20">
        
        {/* 1. ADDRESS Column */}
        <div className="flex flex-col">
          <motion.h2 variants={itemVariants} className="text-xl font-bold mb-8 tracking-widest">
            ADDRESS
          </motion.h2>
          
          <motion.p variants={itemVariants} className="font-semibold mb-4">
            JCX Business Tower
          </motion.p>
          
          <motion.address variants={itemVariants} className="not-italic text-sm text-gray-300 mb-6 leading-relaxed">
            Plot 1136/A, Japan Street, Block # I,
            <br />
            Bashundhara R/A, Dhaka - 1229,
            <br />
            Bangladesh
          </motion.address>
          
          <motion.a 
            variants={itemVariants} 
            href="mailto:sales@jcxbd.com" 
            className="text-white hover:text-blue-500 transition-colors duration-300 mb-1"
          >
            sales@jcxbd.com
          </motion.a>
          
          <motion.a 
            variants={itemVariants} 
            href="mailto:info@jcxbd.com" 
            className="text-white hover:text-blue-500 transition-colors duration-300"
          >
            info@jcxbd.com
          </motion.a>
        </div>

        {/* 2. PHONE Column */}
        <div className="flex flex-col">
          <motion.h2 variants={itemVariants} className="text-xl font-bold mb-8 tracking-widest">
            PHONE
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-sm text-gray-300 mb-2">
            Central Office
          </motion.p>
          
          <motion.a 
            variants={itemVariants} 
            href="tel:+8801324437947" 
            className="text-xl font-bold mb-6 hover:text-blue-500 transition-colors duration-300"
          >
            +8801324-437947
          </motion.a>
          
          <motion.p variants={itemVariants} className="text-xl font-bold">
            16777
          </motion.p>
        </div>

        {/* 3. WORK SCHEDULE Column */}
        <div className="flex flex-col">
          <motion.h2 variants={itemVariants} className="text-xl font-bold mb-8 tracking-widest">
            WORK SCHEDULE
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-gray-300 mb-4">
            Saturday - Thursday:
          </motion.p>
          
          <div className="flex items-center space-x-4">
            <motion.span variants={itemVariants} className="font-semibold text-lg">
              9:30
            </motion.span>
            {/* The horizontal line separator */}
            <motion.div variants={itemVariants} className="w-16 h-0.5 bg-white"></motion.div>
            <motion.span variants={itemVariants} className="font-semibold text-lg">
              17:30
            </motion.span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactInfo;