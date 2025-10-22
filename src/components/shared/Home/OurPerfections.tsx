/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'ICON 100',
    location: 'Bashundhara R/A',
    area: '6900 - 10300 Sq. Ft',
    image: 'https://jcxbd.com/wp-content/uploads/2025/03/LAKE-CONDOS-01-1-1.jpg',
    orientation: 'South-West-East facing',
    address: 'Road: 71, Block: N, Bashundhara R/A, Dhaka',
    landSize: '32 Katha',
    floors: '2B + G + M + 18',
    parking: '140+',
    apartmentSize: '3051-3204 sft (approx.)',
    description: 'A striking modern commercial tower.',
  },
  {
    id: 2,
    title: 'JCX OLYMPUS',
    location: 'Bashundhara R/A, Dhaka',
    area: '1790 - 2270 Sq. Ft',
    image: 'https://jcxbd.com/wp-content/uploads/2024/05/4-1.jpg',
    orientation: 'South-West-East facing',
    address: 'Road: 71, Block: N, Bashundhara R/A, Dhaka',
    landSize: '32 Katha',
    floors: '2B + G + M + 18',
    parking: '140+',
    apartmentSize: '3051-3204 sft (approx.)',
    description: 'Green and sophisticated residential complex.',
  },
  {
    id: 3,
    title: 'JCX N71 LAKE CONDOS',
    location: 'Bashundhara R/A',
    area: '3000 - 3200 Sq. Ft (Approx)',
    image: 'https://jcxbd.com/wp-content/uploads/2025/03/LAKE-CONDOS-01-1-1.jpg',
    orientation: 'South-West-East facing',
    address: 'Road: 71, Block: N, Bashundhara R/A, Dhaka',
    landSize: '32 Katha',
    floors: '2B + G + M + 18',
    parking: '140+',
    apartmentSize: '3051-3204 sft (approx.)',
    description: 'Luxurious waterfront condominium living.',
  },
  {
    id: 4,
    title: 'JCX GRAND RESIDENCES',
    location: 'Bashundhara R/A',
    area: '3242 - 6370 Sq. Ft',
    image: 'https://jcxbd.com/wp-content/uploads/2024/05/4-1.jpg',
    orientation: 'South-West-East facing',
    address: 'Road: 71, Block: N, Bashundhara R/A, Dhaka',
    landSize: '32 Katha',
    floors: '2B + G + M + 18',
    parking: '140+',
    apartmentSize: '3051-3204 sft (approx.)',
    description: 'Elegant and spacious grand residences.',
  },
  {
    id: 5,
    title: 'JCX PREMIUM',
    location: 'Bashundhara R/A',
    area: '3500 - 4000 Sq. Ft',
    image: 'https://jcxbd.com/wp-content/uploads/2024/05/4-1.jpg',
    orientation: 'South-West-East facing',
    address: 'Road: 71, Block: N, Bashundhara R/A, Dhaka',
    landSize: '35 Katha',
    floors: 'G + M + 10',
    parking: '100+',
    apartmentSize: '3500-4000 sft (approx.)',
    description: 'Modern premium residence.',
  },
];

const OurPerfections: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Update visibleCount on resize
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1); // mobile
      else if (width < 1024) setVisibleCount(2); // tablet
      else setVisibleCount(4); // desktop
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = projects.length - visibleCount;
  const totalSegments = projects.length - visibleCount + 1;

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-black text-white py-8 md:py-20">
      {/* Title */}
      <div className="text-center mb-10">
        <motion.p
          className="text-3xl font-light uppercase tracking-widest"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          OUR PERFECTIONS
        </motion.p>
        <motion.div
          className="mx-auto mt-2 h-0.5 w-24 bg-red-600"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
            transition={{ type: 'tween', duration: 0.5 }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className={`w-[calc(100%/${visibleCount}-1.5rem)] shrink-0 rounded-lg overflow-hidden group`}
              >
                <div className="relative h-[300px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-96 h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 z-10"
                    initial={{ y: 50, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Orientation:</strong> {project.orientation}
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Address:</strong> {project.address}
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Land Size:</strong> {project.landSize}
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Floors:</strong> {project.floors}
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Parking:</strong> {project.parking}
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Apartment Size:</strong> {project.apartmentSize}
                    </p>
                  </motion.div>
                </div>
                <div className="bg-black/80 p-4 text-left">
                  <p className="text-sm text-gray-300">{project.location}</p>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.area}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center mt-6">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 mr-4 ${
              currentIndex === 0 ? 'text-gray-500' : 'text-white hover:text-red-600'
            } transition duration-200`}
          >
            <FaArrowLeftLong className="text-4xl" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`p-2 mr-6 ${
              currentIndex === maxIndex ? 'text-gray-500' : 'text-white hover:text-red-600'
            } transition duration-200`}
          >
            <FaArrowRightLong className="text-4xl" />
          </button>

          {/* Segment Progress */}
          <div className="hidden flex-1 md:flex gap-1 h-1 bg-gray-700 rounded">
            {Array.from({ length: totalSegments }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded ${idx === currentIndex ? 'bg-gray-300' : 'bg-gray-500'}`}
                style={{ flex: 1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPerfections;
