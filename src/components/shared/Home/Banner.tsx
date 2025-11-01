/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HiArrowLongRight } from "react-icons/hi2";

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

// Custom Thin Arrow Icons with very thin strokes
const ThinArrowLeft = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ThinArrowRight = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const BannerText: React.FC<{ data: BannerSlide; direction: "next" | "prev" }> = ({
  data,
  direction,
}) => {
  const initialClasses =
    direction === "next"
      ? "translate-x-[2000px] opacity-100"
      : "translate-x-[-2000px] opacity-100";
  const finalClasses = "translate-x-0 opacity-100";

  const [animationClasses, setAnimationClasses] = React.useState(initialClasses);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimationClasses(finalClasses), 50);
    return () => clearTimeout(timeout);
  }, [direction, data]);

  return (
    <div
      className={`max-w-2xl transition-transform duration-700 ease-out ${animationClasses}`}
    >
      <p className="text-sm md:text-lg uppercase tracking-widest font-medium mb-1 text-[#E9EBDD]">
        {data.smallText}
      </p>
      <h3
        className="leading-none tracking-wider uppercase text-[#E9EBDD] text-[125px]"
        style={{ lineHeight: 1.2, fontWeight: 300 }}
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
        console.error("Failed to fetch slides:", err);
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

  if (totalSlides === 0) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.url}
          alt={slide.largeText}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${index === currentSlideIndex ? "translate-x-0 scale-100 z-10" : "translate-x-full scale-105 z-0"
            }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/1920x1080/000000/FFFFFF?text=Image+Unavailable";
          }}
        />
      ))}

      {/* Text */}
      <div className="absolute top-[450px] inset-0 z-20 flex flex-col  px-6 md:px-16">
        <BannerText key={currentSlideIndex} data={currentSlide} direction={direction} />
      </div>

      {/* Buttons - Using custom thin arrows */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-8">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="p-2 text-white hover:text-gray-300 transition-all duration-300 cursor-pointer group"
        >
          <ThinArrowLeft className="w-20 h-12  transition-transform duration-300 group-hover:scale-110" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="p-2 text-white hover:text-gray-300 transition-all cursor-pointer duration-300 group"
        >
          <ThinArrowRight className="w-20 h-12   transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default Banner;