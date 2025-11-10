'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Belief {
  id: string;
  title: string;
  description: string;
}

const beliefs: Belief[] = [
  {
    id: 'trust',
    title: 'TRUST',
    description:
      'Trustworthiness is one of our most prized values. Ensuring a culture that naturalizes the sense of reliability among the people involved enhances productivity, respect and helps strengthen the bond between the clients and us.',
  },
  {
    id: 'closeness',
    title: 'CLOSENESS',
    description:
      'Maintaining long-term, rewarding relationships with our clients is one of the principal things we transgress. Their happiness is our advancement towards success, and we make it happen by paying attention to the tiniest details.',
  },
  {
    id: 'uniqueness',
    title: 'UNIQUENESS',
    description:
      'We celebrate individuality and strategic differentiation. Our unique perspectives and creative problem-solving methods are what allow us to deliver distinctive value.',
  },
  {
    id: 'integrity',
    title: 'INTEGRITY',
    description:
      'We uphold uncompromising honesty and strong moral principles in all our dealings. Our commitment to integrity ensures transparency and accountability in every decision we make.',
  },
];

const BeliefsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(beliefs[0].id);
  const activeContent = beliefs.find(b => b.id === activeTab);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 80, stiffness: 80, mass: 4 });
  const moveY = useTransform(smoothVelocity, [-1000, 1000], [20, -20]); // small translate for text

  return (
    <div className="bg-black py-20 px-4 md:px-12 text-white overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-light uppercase tracking-widest text-white">
          THE BASIS OF OUR BELIEFS
        </h2>
        <div className="mx-auto h-0.5 w-16 bg-[#F6BD2F]  mt-2" />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto">
        {/* Tabs + Text */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 relative bg-[#1a1a1a] min-h-[350px] lg:mr-[-100px] z-10 shadow-xl">
          <div className="flex relative mb-10 pb-1">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700 z-0" />
            {beliefs.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative uppercase tracking-widest cursor-pointer text-sm font-light transition-colors duration-300 mr-8 pb-1 z-10"
                style={{ color: activeTab === item.id ? 'white' : 'gray' }}
              >
                {item.title}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent ? activeContent.id : 'empty'}
              style={{ y: moveY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[150px] mt-4"
              ref={ref}
            >
              {activeContent && (
                <p className="text-base leading-relaxed text-gray-300">
                  {activeContent.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-[-100px] lg:mt-0 z-0">
          <div className="relative w-full max-w-xl lg:h-[450px] aspect-4/3 lg:aspect-auto">
            <Image
              src="https://i.postimg.cc/TPfrB3Nd/pexels-fauxels-3184292-2.jpg"
              alt="Hands connecting two jigsaw puzzle pieces, symbolizing partnership and trust."
              fill
              style={{ objectFit: 'cover' }}
              className="shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeliefsSection;
