/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, easeOut, Variants } from "framer-motion";

interface VideoItem {
  id: number;
  title: string;
  date: string;
  videoUrl: string;
  thumbnail: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Corporate Event Highlights",
    date: "Oct 10, 2025",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Office Tour",
    date: "Sep 20, 2025",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "Client Testimonial",
    date: "Aug 12, 2025",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://i.ytimg.com/vi/DLX62G4lc44/maxresdefault.jpg",
  },
  {
    id: 4,
    title: "New Office Setup",
    date: "Jul 25, 2025",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://i.ytimg.com/vi/e-ORhEE9VVg/maxresdefault.jpg",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const VideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="py-16 px-4 md:px-12 bg-black text-white">
      {/* Section Title */}
      <div className="text-center mb-16">
        <motion.p
          className="text-3xl font-light uppercase tracking-widest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Video Gallery
        </motion.p>
        <motion.div
          className="mx-auto mt-2 h-0.5 w-24 bg-red-600"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className={`relative cursor-pointer group overflow-hidden rounded-2xl shadow-lg transition-all duration-700 ${
              // Left video একটু উপরে, right একটু নিচে
              index % 2 === 0
                ? "md:-translate-y-6"
                : "md:translate-y-6"
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            viewport={{ once: true }}
            onClick={() => setActiveVideo(video.videoUrl)}
          >
            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay Play Icon */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-6xl">▶</span>
            </div>

          
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <video
            src={activeVideo}
            controls
            autoPlay
            className="w-[90%] md:w-[70%] rounded-2xl shadow-lg"
          />
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
