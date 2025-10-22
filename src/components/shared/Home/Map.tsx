/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";

const Map: React.FC = () => {
  // You should replace this with the actual coordinates/link for your location
  const MAP_URL =
    "https://www.google.com/maps/search/?api=1&query=23.7771,90.3995";
  // Image URL for the static map background
  const STATIC_MAP_IMAGE =
    "https://i.postimg.cc/7Pmqdw4y/Screenshot-2025-10-22-143005.png";

  return (
    <div className="bg-black py-20 px-4 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* 1. Interactive Map Container (Triggers HOVER on the entire area) */}
        <motion.a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full aspect-16/6 md:aspect-16/7 cursor-pointer overflow-hidden shadow-2xl"
          initial="restMap" // Initial state for the whole map area
          whileHover="hoverMap" // Hover state for the whole map area
        >
          {/* Static Map Image */}
          <img
            src={STATIC_MAP_IMAGE}
            alt="Map of Dhaka, Bangladesh showing JCX location"
            className="w-full h-full object-cover"
          />

          {/* 2. Dark Overlay & Button Container (This container FADES IN on map hover) */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4"
            variants={{
              restMap: { opacity: 0 }, // Button area is hidden initially
              hoverMap: {
                opacity: 1, // Button area fades in on map hover
                transition: { duration: 0.3 },
              },
            }}
          >
            {/* JCX Logo (Icon) - Fades in with the button area */}
            <motion.div
              className="w-10 h-10 bg-white rounded-full flex justify-center items-center mb-4"
              variants={{
                restMap: { opacity: 0 },
                hoverMap: {
                  opacity: 1,
                  scale: [1, 1.1, 1],
                  transition: { delay: 0.1 },
                }, // Pops slightly when appearing
              }}
            >
              <span className="text-black font-bold text-xs">JCX</span>
            </motion.div>

            {/* 3. The Button: Click to Load Map (This has a separate FILL animation on button hover) */}
            <motion.div
              // The map container's 'hoverMap' state makes the button visible.
              // The button itself has its own 'rest' and 'fill' states for the color animation.
              className="relative uppercase tracking-widest text-lg md:text-xl font-light px-8 py-3 border border-white rounded overflow-hidden z-20"
              initial="rest" // Custom initial state for the button fill (invisible white background)
              whileHover="fill" // Custom hover state for the button fill
            >
              {/* 4. Sliding Background Div (The Left-to-Right Fill) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white z-0"
                variants={{
                  rest: { scaleX: 0, transformOrigin: "left" }, // Start at zero width
                  fill: {
                    scaleX: 1,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }, // Grow to full width on button hover
                }}
              />

              {/* Button Text (Changes color on hover) */}
              <motion.span
                className="relative z-10"
                variants={{
                  rest: { color: "#ffffff" },
                  fill: {
                    color: "#000000",
                    transition: { delay: 0.2, duration: 0.1 },
                  }, // Color changes after fill starts
                }}
              >
                CLICK TO LOAD THE MAP
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
};

export default Map;
