/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion"; // Framer Motion ইমপোর্ট করা হলো

// --- 1. ডামি ডেটা (আপনার দেওয়া ডেটা) ---
const projectsData = [
  // আপনার ডেটা সেট থেকে category এবং filter ট্যাগগুলো যোগ করা হলো
  {
    id: 1,
    title: "ICON 100",
    location: "Bashundhara R/A",
    area: "6900 - 10300 Sq. Ft",
    image:
      "https://jcxbd.com/wp-content/uploads/2025/03/LAKE-CONDOS-01-1-1.jpg",
    orientation: "South-West-East facing",
    address: "Road: 71, Block: N, Bashundhara R/A, Dhaka",
    landSize: "32 Katha",
    floors: "2B + G + M + 18",
    parking: "140+",
    apartmentSize: "3051-3204 sft (approx.)",
    category: "HANDOVER",
    filter: "HANDOVER",
  },
  {
    id: 2,
    title: "JCX OLYMPUS",
    location: "Bashundhara R/A, Dhaka",
    area: "1790 - 2270 Sq. Ft",
    image: "https://jcxbd.com/wp-content/uploads/2024/05/4-1.jpg",
    orientation: "South-West-East facing",
    address: "Road: 71, Block: N, Bashundhara R/A, Dhaka",
    landSize: "32 Katha",
    floors: "2B + G + M + 18",
    parking: "140+",
    apartmentSize: "3051-3204 sft (approx.)",
    category: "RESIDENTIAL",
    filter: "ONGOING",
  },
  {
    id: 3,
    title: "JCX N71 LAKE CONDOS",
    location: "Bashundhara R/A",
    area: "3000 - 3200 Sq. Ft (Approx)",
    image:
      "https://jcxbd.com/wp-content/uploads/2025/03/LAKE-CONDOS-01-1-1.jpg",
    orientation: "South-West-East facing",
    address: "Road: 71, Block: N, Bashundhara R/A, Dhaka",
    landSize: "32 Katha",
    floors: "2B + G + M + 18",
    parking: "140+",
    apartmentSize: "3051-3204 sft (approx.)",
    category: "BASHUNDHARA",
    filter: "UPCOMING",
  },
  {
    id: 4,
    title: "JCX GRAND RESIDENCES",
    location: "Bashundhara R/A",
    area: "3242 - 6370 Sq. Ft",
    image: "https://jcxbd.com/wp-content/uploads/2024/05/4-1.jpg",
    orientation: "South-West-East facing",
    address: "Road: 71, Block: N, Bashundhara R/A, Dhaka",
    landSize: "32 Katha",
    floors: "2B + G + M + 18",
    parking: "140+",
    apartmentSize: "3051-3204 sft (approx.)",
    category: "HANDOVER",
    filter: "ONGOING",
  },
  {
    id: 5,
    title: "JCX PREMIUM",
    location: "Bashundhara R/A",
    area: "3500 - 4000 Sq. Ft",
    image: "https://jcxbd.com/wp-content/uploads/2024/05/4-1.jpg",
    orientation: "South-West-East facing",
    address: "Road: 71, Block: N, Bashundhara R/A, Dhaka",
    landSize: "35 Katha",
    floors: "G + M + 10",
    parking: "100+",
    apartmentSize: "3500-4000 sft (approx.)",
    category: "RESIDENTIAL",
    filter: "HANDOVER",
  },
  {
    id: 6,
    title: "LAKE VIEW",
    location: "Purbachal",
    area: "2000 Sq. Ft",
    image:
      "https://jcxbd.com/wp-content/uploads/2025/03/LAKE-CONDOS-01-1-1.jpg",
    orientation: "North facing",
    address: "Purbachal, Dhaka",
    landSize: "15 Katha",
    floors: "G + 8",
    parking: "20",
    apartmentSize: "2000 sft (approx.)",
    category: "HANDOVER",
    filter: "UPCOMING",
  },
];

const topCategories = ["HANDOVER", "RESIDENTIAL", "BASHUNDHARA"];
const subFilters = ["ALL", "ONGOING", "HANDOVER", "UPCOMING"];

const ProjectCard = ({ project }: any) => (
  <div className="w-full sm:w-1/2 lg:w-1/3 p-3 shrink-0">
    <div
      key={project.id}
      className="rounded-lg overflow-hidden group shadow-lg"
    >
      <div className="relative h-96">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* হোভার ডিটেইলস ওভারলে */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex flex-col justify-center p-6 text-white opacity-0 group-hover:opacity-100 z-10"
          initial={{ y: 50, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-2 border-b border-gray-600 pb-2">
            {project.title}
          </h3>
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

      {/* কার্ডের নিচের অংশ */}
      <div className=" p-4 text-left text-black">
        <p className="text-xs text-gray-600">{project.location}</p>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-500">{project.area}</p>
      </div>
    </div>
  </div>
);

const ProjectFilter = () => {
  const [activeCategory, setActiveCategory] = useState(topCategories[0]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    topCategories[0]
  ); 

  const filteredProjects = useMemo(() => {
    const projectsWithDefaults = projectsData.map((p) => ({
      ...p,
      category: p.category || topCategories[0],
      filter: p.filter || "ALL",
    }));

    const categoryFiltered = projectsWithDefaults.filter(
      (project) => project.category === activeCategory
    );

    if (activeFilter === "ALL") {
      return categoryFiltered;
    }

    return categoryFiltered.filter(
      (project) => project.filter === activeFilter
    );
  }, [activeCategory, activeFilter]);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setActiveFilter("ALL");

    setOpenDropdown(openDropdown === categoryName ? null : categoryName);
  };

  const handleFilterSelect = (filterName: string) => {
    setActiveFilter(filterName);
    setOpenDropdown(null); // ফিল্টার সিলেক্ট হওয়ার পর ড্রপডাউন বন্ধ
  };

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="bg-black text-white flex border-b border-gray-700 relative z-20">
        {topCategories.map((cat) => (
          <div
            key={cat}
            className={`
                            relative w-1/3 text-center py-4 cursor-pointer 
                            border-r border-gray-700 last:border-r-0
                            ${
                              activeCategory === cat
                                ? "bg-gray-800"
                                : "hover:bg-gray-900"
                            }
                        `}
          >
            <div
              className="flex items-center justify-center h-full text-lg"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
              <span className="absolute right-4 text-xl">
                {openDropdown === cat ? "×" : "+"}
              </span>
            </div>

           
            <motion.div
              initial={false}
              animate={
                openDropdown === cat
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-black shadow-xl overflow-hidden"
            >
              {openDropdown === cat && (
                <div className="border-t border-white">
                  <div className="py-3 px-6 text-sm text-gray-400 font-light text-left border-b border-gray-700">
                    SELECT CATEGORY
                  </div>
                  {subFilters.map((filter) => (
                    <div
                      key={filter}
                      onClick={() => handleFilterSelect(filter)}
                      className={`
                                                py-3 px-6 text-sm text-left transition duration-200
                                                ${
                                                  activeFilter === filter
                                                    ? "bg-blue-900 font-semibold"
                                                    : "hover:bg-gray-800"
                                                }
                                            `}
                    >
                      {filter === "ALL" ? "VIEW ALL" : filter}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="p-8">
        <div className="flex flex-wrap -m-3 justify-start">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="text-gray-600 p-10 text-center text-xl w-full">
              Sorry **{activeCategory}** **{activeFilter}** not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
