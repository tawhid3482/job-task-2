/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

interface BannerSlide {
  url: string;
  smallText: string;
  largeText: string;
}

interface BackendSlide {
  id: string;
  title: string;
  text: string;
  Image: string;
}

const BannerText: React.FC<{ data: BannerSlide; direction: "next" | "prev" }> = ({
  data,
  direction,
}) => {
  const initialClasses =
    direction === "next"
      ? "translate-x-[2000px] opacity-100"
      : "translate-x-[-2000px] opacity-100";
  const finalClasses = "translate-x-0 opacity-100";

  const [animationClasses, setAnimationClasses] = useState(initialClasses);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimationClasses(finalClasses), 50);
    return () => clearTimeout(timeout);
  }, [direction, data]);

  return (
    <div
      className={`max-w-2xl transition-all duration-1000 ease-out ${animationClasses}`}
    >
      <p className="text-sm md:text-lg uppercase tracking-widest font-medium mb-1 text-gray-200">
        {data.smallText}
      </p>
      <h3
        className="leading-none tracking-wider uppercase text-gray-200 font-light"
        style={{ fontSize: "9vw", lineHeight: 1.2, fontWeight: 300 }}
      >
        {data.largeText}
      </h3>
    </div>
  );
};

const Banner: React.FC = () => {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  // Fetch from backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("https://job-task-2-backend.vercel.app/api/v1/slider");
        const json = await res.json();
        if (json.success && json.data) {
          const mapped: BannerSlide[] = json.data.map((item: BackendSlide) => ({
            url: item.Image,
            smallText: item.title,
            largeText: item.text,
          }));
          setSlides(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch slides", err);
      }
    };
    fetchSlides();
  }, []);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setDirection("next");
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection("prev");
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides === 0) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, totalSlides]);

  const getSlideClasses = (index: number) => {
    const baseClasses =
      "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out";

    if (index === currentSlideIndex) return `${baseClasses} translate-x-0 scale-100`;

    if (direction === "next") {
      if (index > currentSlideIndex || (currentSlideIndex === totalSlides - 1 && index === 0))
        return `${baseClasses} translate-x-full scale-105`;
    }

    if (direction === "prev") {
      if (index < currentSlideIndex || (currentSlideIndex === 0 && index === totalSlides - 1))
        return `${baseClasses} translate-x-[-100%] scale-105`;
    }

    return `${baseClasses} translate-x-[-100%] scale-105`;
  };

  if (totalSlides === 0) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.url}
          alt={slide.largeText}
          className={getSlideClasses(index)}
          style={{ minWidth: "100%", minHeight: "100%" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/1920x1080/000000/FFFFFF?text=Image+Unavailable";
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-10"></div>

      {/* Content + Buttons */}
      <div className="absolute inset-0 z-20 flex items-end justify-between px-4 md:px-8 pb-1 md:pb-2">
        <BannerText key={currentSlideIndex} data={slides[currentSlideIndex]} direction={direction} />
        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="p-4 bg-transparent text-white transition-all duration-300 transform hover:scale-90 rounded-full"
          >
            <FaArrowLeftLong className="text-4xl" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="p-4 bg-transparent text-white transition-all duration-300 transform hover:scale-90 rounded-full"
          >
            <FaArrowRightLong className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
