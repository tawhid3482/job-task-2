/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
      delay: 1.5,
    },
  },
};

interface Project {
  id: string;
  Title: string;
  Type: string;
  Image: string;
  Orientation: string;
  Address: string;
  FrontRoad: string;
  LandSize: string;
  ApartmentSize: string;
  NumberOfUnits: number;
  NumberOfParking: number;
  NumberOfFloors: number;
  status: string;
  createdAt: string;
}

const OurPerfections: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Fetch data from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://job-task-2-backend.vercel.app/api/v1/perfections"
        );
        const json = await res.json();
        setProjects(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (!projects.length)
    return (
      <div className="py-20 flex justify-center items-center">
        <p className="text-white text-xl">No projects available.</p>
      </div>
    );

  const maxIndex = Math.max(0, projects.length - visibleCount);
  //  Math.max(0, testimonials.length - visibleCount);
  const totalSegments = projects.length - visibleCount + 1;

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-black text-white py-8 md:py-24">
      <div className="text-center mb-20">
        <motion.p
          className="text-3xl font-light uppercase tracking-widest"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          OUR PERFECTIONS
        </motion.p>
        <motion.div
          className="mx-auto mt-2 h-1 w-14 bg-[#F6BD2F]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto px-8">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {projects.map((project) => (
              <Link
                href={`/properties/${project.id}`}
                key={project.id}
                className={`w-[calc(100%/${visibleCount}-1.5rem)] shrink-0 overflow-hidden group cursor-pointer`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={project.Image}
                    alt={project.Title}
                    className="w-72 h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/70 flex flex-col justify-start p-6 opacity-0 group-hover:opacity-100 z-10"
                    initial={{ y: 50, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-sm text-gray-200 mb-1 flex items-baseline gap-2">
                      <span className="w-1 h-1 bg-white flex items-center justify-center text-xs shrink-0"></span>
                      <div>
                        <span>Orientation:</span> {project.Orientation}
                      </div>
                    </p>

                    <p className="text-sm text-gray-200 mb-1 flex items-baseline gap-2">
                      <span className="w-1 h-1 bg-white flex items-center justify-center text-xs shrink-0"></span>
                      <div>
                        <span>Address:</span> {project.Address}
                      </div>
                    </p>
                    <p className="text-sm text-gray-200 mb-1 flex items-baseline gap-2">
                      <span className="w-1 h-1 bg-white flex items-center justify-center text-xs shrink-0"></span>
                      <div>
                        <span>Land Size:</span> {project.LandSize}
                      </div>
                    </p>
                    <p className="text-sm text-gray-200 mb-1 flex items-baseline gap-2">
                      <span className="w-1 h-1 bg-white flex items-center justify-center text-xs shrink-0"></span>
                      <div>
                        <span>Number of Units:</span> {project.ApartmentSize}
                      </div>
                    </p>
                    <p className="text-sm text-gray-200 mb-1 flex items-baseline gap-2">
                      <span className="w-1 h-1 bg-white flex items-center justify-center text-xs shrink-0"></span>
                      <div>
                        <span>Floors Road:</span> {project.NumberOfFloors}
                      </div>
                    </p>
                    <p className="text-sm text-gray-200 mb-1 flex items-baseline gap-2">
                      <span className="w-1 h-1 bg-white flex items-center justify-center text-xs shrink-0"></span>
                      <div>
                        <span>Number of Parking:</span>{" "}
                        {project.NumberOfParking}
                      </div>
                    </p>
                    <p className="text-sm text-gray-200 mb-1 flex items-baseline gap-2">
                      <span className="w-1 h-1 bg-white flex items-center justify-center text-xs shrink-0"></span>
                      <div>
                        <span>Apartment Size:</span> {project.ApartmentSize}
                      </div>
                    </p>

                    {/* Explore Button */}
                    <motion.div
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      className="relative flex flex-col items-start mt-16 my-2"
                    >
                      <motion.div
                        className="w-20 h-px bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        style={{ originX: 0.5 }}
                      />
                      <motion.span
                        className="uppercase tracking-widest text-sm font-light hover:text-gray-300 transition-colors duration-300 my-2"
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        EXPLORE
                      </motion.span>
                      <motion.div
                        className="w-20 h-px bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        style={{ originX: 0.5 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
                <div className="bg-black/80 p-4 text-left">
                  <p className="text-sm text-gray-300">{project.Type}</p>
                  <h3 className="text-xl font-bold">{project.Title}</h3>
                  <p className="text-sm text-gray-300">{project.LandSize}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center mt-20">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 mr-4 ${
              currentIndex === 0
                ? "text-gray-500"
                : "text-white hover:text-red-600"
            } transition duration-200`}
          >
            <FaArrowLeftLong className="text-4xl" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`p-2 mr-6 ${
              currentIndex === maxIndex
                ? "text-gray-500"
                : "text-white hover:text-red-600"
            } transition duration-200`}
          >
            <FaArrowRightLong className="text-4xl" />
          </button>

          {/* Segment Progress */}
          <div className="hidden md:flex flex-1 h-px bg-gray-400 rounded overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gray-200"
              animate={{
                x: `${(currentIndex / (totalSegments - 1)) * 100}%`,
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

export default OurPerfections;
