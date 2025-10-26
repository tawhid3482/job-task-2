/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

// 1. Testimonial Data Structure
interface Testimonial {
  id: number;
  image: string;
  feedback: string;
  author: string;
}

// 2. Testimonial Data (using placeholders based on your images)
const testimonials: Testimonial[] = [
  {
    id: 1,
    image: "https://jcxbd.com/wp-content/uploads/2021/11/DSC04477-scaled-1.jpg",
    feedback:
      "Thank you for helping us throughout the project and also getting the apartment ready on time. Really happy with the effort of your team and wish you success.",
    author: "-Mehazabien Chowdhury",
  },
  {
    id: 2,
    image: "https://jcxbd.com/wp-content/uploads/2021/11/IMG_4588-scaled-1.jpg", // Example image URL
    feedback:
      "JCX for being very friendly and understanding. I have experienced this kind of cooperation very rarely in this industry. Best Wishes to the company.",
    author: "-Mohsin Ahmed",
  },
  {
    id: 3,
    image: "https://jcxbd.com/wp-content/uploads/2021/09/DSC04730-scaled-1.jpg", // Example image URL
    feedback:
      "I must praise the consultant who worked with us and helped us choose the perfect apartment. He understood our requirements very well and helped us accordingly. Great team!",
    author: "-Morshed Hossain",
  },
  {
    id: 4,
    image: "https://jcxbd.com/wp-content/uploads/2021/11/IMG_4588-scaled-1.jpg", // Another example image URL
    feedback:
      "Truly impressed with the quality and attention to detail. The whole process was seamless, and the team was incredibly supportive from start to finish. Highly recommend JCX!",
    author: "-Jane Doe",
  },
  {
    id: 5,
    image: "https://jcxbd.com/wp-content/uploads/2021/11/DSC04477-scaled-1.jpg", // Another example image URL
    feedback:
      "From initial consultation to final handover, JCX demonstrated professionalism and expertise. Their projects are top-notch, and customer satisfaction is clearly a priority.",
    author: "-John Smith",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 2 testimonials at a time, as per your screenshots
  const visibleCount = 2;
  const maxIndex = testimonials.length - visibleCount;

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  // Number of progress segments based on how many "pages" of testimonials there are
  const totalSegments = Math.ceil(testimonials.length / visibleCount);

  return (
    <div className="bg-black text-white py-8 md:py-20">
      {/* Title */}
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-5xl font-light uppercase tracking-widest"
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
          style={{ transformOrigin: "center" }} // Changed origin to center for title underline
        ></motion.div>
      </div>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8" // Increased gap between cards
            animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                // Each card takes 50% width minus half the gap
                className="w-[calc(50%-1rem)] shrink-0 flex flex-col md:flex-row items-start bg-black"
              >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px] overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay to match the blue/red tint in your screenshots */}
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/50 to-red-600/50 mix-blend-multiply opacity-70"></div>
                </div>

                {/* Feedback Section */}
                <div className="w-full md:w-1/2 p-6 bg-black text-left border border-gray-800 md:border-l-0">
                  <p className="text-gray-300 text-base mb-4 leading-relaxed">
                    {testimonial.feedback}
                  </p>
                  <p className="text-white font-semibold text-right">
                    {testimonial.author}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center mt-12 max-w-5xl mx-auto">
          {" "}
          {/* Centered and slightly narrower navigation */}
          {/* Left Arrow */}
          <motion.button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 mr-4 ${
              currentIndex === 0
                ? "text-gray-600 cursor-not-allowed"
                : "text-white hover:text-red-600"
            } transition duration-200`}
            whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
            whileTap={{ scale: currentIndex === 0 ? 1 : 0.9 }}
          >
            <FaArrowLeftLong className="text-3xl" />
          </motion.button>
          {/* Right Arrow */}
          <motion.button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`p-2 mr-6 ${
              currentIndex === maxIndex
                ? "text-gray-600 cursor-not-allowed"
                : "text-white hover:text-red-600"
            } transition duration-200`}
            whileHover={{ scale: currentIndex === maxIndex ? 1 : 1.1 }}
            whileTap={{ scale: currentIndex === maxIndex ? 1 : 0.9 }}
          >
            <FaArrowRightLong className="text-3xl" />
          </motion.button>
          {/* Segment Progress */}
          {/* Segment Progress (active-only highlight) */}
          <div className="hidden md:flex flex-1 h-1 bg-gray-700 rounded overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gray-300"
              animate={{
                x: `${
                  (currentIndex / (totalSegments - 2)) *
                  (100 - 100 / totalSegments)
                }%`,
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
