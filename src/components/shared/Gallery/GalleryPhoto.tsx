/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion, easeOut, Variants } from "framer-motion";

interface Photo {
  id: number;
  image: string;
  title: string;
  date: string;
}

const photos: Photo[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000",
    title: "Corporate Event",
    date: "October 5, 2024",
  },
  {
    id: 2,
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    title: "Team Celebration",
    date: "August 14, 2024",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/free-photo/green-trees-near-body-water-daytime_395237-20.jpg?semt=ais_hybrid&w=740&q=80",
    title: "New Project Launch",
    date: "June 30, 2024",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJg2QSXSldD-3zI5vnzwwVqSJfd4jb8rqT-zbu3-j5t6vOO0FRDKwx7Xe1mpvrvLmTT3o&usqp=CAU",
    title: "Annual Meeting",
    date: "May 10, 2024",
  },
];

const GalleryPhoto = () => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut },
    },
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="py-20 bg-black text-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <motion.p
          className="text-3xl font-light uppercase tracking-widest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Photo Albums
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

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 md:px-16">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            className="cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            onClick={() => setSelectedImage(photo.image)}
          >
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Text and Date (Always Visible) */}
            <div className="mt-4 text-left">
              <p className="text-lg font-medium">{photo.title}</p>
              <p className="text-sm text-gray-400">{photo.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Fullscreen"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: easeOut }}
          />
          <button
            className="absolute top-8 right-8 text-white text-3xl font-light hover:text-red-500 transition"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryPhoto;
