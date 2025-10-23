/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

const aboutUsData = [
  {
    id: 1,
    title: "MISSION",
    imageUrl: "https://jcxbd.com/wp-content/uploads/2021/11/About-Us-Mission.jpg",
    description:
      "Our mission is to put our customers’ happiness as the first priority.",
  },
  {
    id: 2,
    title: "BRAND PROMISE",
    imageUrl: "https://jcxbd.com/wp-content/uploads/2021/11/About-Us-Brand-Promise.jpg",
    description:
      "Our brand promise is to establish trust with clients with a touch of our individuality and integrity.",
  },
  {
    id: 3,
    title: "VISION",
    imageUrl: "https://jcxbd.com/wp-content/uploads/2021/11/About-Us-Vision.jpg",
    description:
      "We envision building apartments that are both luxurious and affordable and hence fulfilling the dreams of our customers.",
  },
];

const AboutUsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="flex flex-col sm:flex-row  bg-black overflow-hidden">
      {aboutUsData.map((item) => (
        <div
          key={item.id}
          className={`
            relative group 
            h-96
            overflow-hidden cursor-pointer 
            transition-all duration-700 ease-in-out
            ${hoveredCard === item.id ? "sm:w-[50%]" : "sm:w-[35%] w-full"}
          `}
          onMouseEnter={() => setHoveredCard(item.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Background Image */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out 
              ${hoveredCard === item.id ? "scale-110" : "scale-100"}`}
          />

          {/* Dark Overlay */}
          <div
            className={`absolute inset-0 transition-all duration-700 
              ${hoveredCard === item.id ? "bg-black/60" : "bg-black/40"}`}
          ></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8 z-10">
            <h2
              className={`text-xl font-bold tracking-wide transition-all duration-700 ${
                hoveredCard === item.id ? "text-xl" : "text-xl"
              }`}
            >
              {item.title}
            </h2>

            {/* Description (Only on hover) */}
            <p
              className={`max-w-md mt-4 text-sm sm:text-base transition-all duration-700 ease-in-out ${
                hoveredCard === item.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUsSection;
