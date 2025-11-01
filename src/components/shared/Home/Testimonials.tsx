/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  Image: string;
  content: string;
  name: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 2;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          "https://job-task-2-backend.vercel.app/api/v1/testimonial"
        );
        const json = await res.json();

        // Backend a Data field e testimonials array ase
        setTestimonials(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setTestimonials([]);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0)
    return (
      <div className="py-20 flex justify-center items-center">
        <p className="text-white text-xl">No testimonials available.</p>
      </div>
    );

  const maxIndex = testimonials.length - visibleCount;

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const totalSegments = Math.ceil(testimonials.length / visibleCount);

  return (
    <div className="bg-[#1B1B1B] text-white  py-8 md:py-28 min-h-screen">
      {/* Title */}
      <div className="text-center mb-10">
        <motion.h2
          className="text-xl md:text-3xl font-light uppercase tracking-widest"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          TESTIMONIALS
        </motion.h2>
        <motion.div
          className="mx-auto mt-2 h-0.5 w-24 bg-red-600"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[calc(50%-1rem)] shrink-0 flex flex-col md:flex-row items-start"
              >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 **h-[180px] md:h-[280px]** overflow-hidden">
                  <img
                    src={testimonial.Image}
                    alt={testimonial.name}
                    className="md:w-[362px] md:h-[332px] object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/50 to-red-600/50 mix-blend-multiply opacity-70"></div>
                </div>

                <div className="w-full text-sm md:w-1/2 p-6 bg-black text-left md:mt-5 md:-ml-8   **relative z-30   ">
                  <p className="text-gray-300 text-base mb-4 leading-relaxed">
                    {testimonial.content}
                  </p>
                  <p className="text-white font-semibold text-right">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center mt-18 w-full mx-auto justify-between md:gap-28">
          <div className="">
            <motion.button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-2 mr-4 ${currentIndex === 0
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white hover:text-red-600"
                } transition duration-200`}
              whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
              whileTap={{ scale: currentIndex === 0 ? 1 : 0.9 }}
            >
              <FaArrowLeftLong className="text-4xl" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`p-2 mr-6 ${currentIndex === maxIndex
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white hover:text-red-600"
                } transition duration-200`}
              whileHover={{ scale: currentIndex === maxIndex ? 1 : 1.1 }}
              whileTap={{ scale: currentIndex === maxIndex ? 1 : 0.9 }}
            >
              <FaArrowRightLong className="text-4xl" />
            </motion.button>
          </div>

          <div className="hidden md:flex flex-1 h-1 bg-gray-700 rounded overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gray-300"
              animate={{
                x: `${(currentIndex / maxIndex) * 100}%`,
                width: `${100 / totalSegments}%`,
              }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
