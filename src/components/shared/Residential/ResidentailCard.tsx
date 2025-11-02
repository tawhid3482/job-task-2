/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
  NumberOfUnits: string;
  NumberOfParking: string;
  NumberOfFloors: string;
  status: string;
  createdAt: string;
}

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 1.4 },
  },
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="w-full sm:w-1/2 lg:w-1/3 p-3 shrink-0">
    <Link href={`/properties/${project.id}`} className="block">
      <div className="rounded-lg overflow-hidden group shadow-lg cursor-pointer md:w-[430px] md:h-[680px]">
        <div className="relative overflow-hidden">
          <img
            src={project.Image}
            alt={project.Title}
            className="md:h-[580px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <motion.div
            className="absolute inset-0 bg-black/70 flex flex-col justify-start py-10 px-8 text-white opacity-0 group-hover:opacity-100 z-10 space-y-5"
            initial={{ y: 50, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
           

            <p className="text-sm  mb-1 flex items-baseline gap-2">
              <span className="w-1 h-1 bg-white text-white flex items-center justify-center text-xs shrink-0"></span>
              <span>
                <span>Orientation:</span> {project.Orientation}
              </span>
            </p>

            <p className="text-sm  mb-1 flex items-baseline gap-2">
              <span className="w-1 h-1 bg-white text-white flex items-center justify-center text-xs shrink-0"></span>
              <span>
                <span>Address:</span> {project.Address}
              </span>
            </p>

            <p className="text-sm  mb-1 flex items-baseline gap-2">
              <span className="w-1 h-1 bg-white text-white flex items-center justify-center text-xs shrink-0"></span>
              <span>
                <span>Land Size:</span> {project.LandSize} Katha
              </span>
            </p>
            <p className="text-sm  mb-1 flex items-baseline gap-2">
              <span className="w-1 h-1 bg-white text-white flex items-center justify-center text-xs shrink-0"></span>
              <span>
                <span>Font Road:</span> {project.NumberOfParking} 
              </span>
            </p>

            <p className="text-sm  mb-1 flex items-baseline gap-2">
              <span className="w-1 h-1 bg-white text-white flex items-center justify-center text-xs shrink-0"></span>
              <span>
                <span>Number of Floors:</span> {project.NumberOfFloors}
              </span>
            </p>

            <p className="text-sm  mb-1 flex items-baseline gap-2">
              <span className="w-1 h-1 bg-white text-white flex items-center justify-center text-xs shrink-0"></span>
              <span>
                <span>Number of Parking:</span> {project.NumberOfParking}
              </span>
            </p>

            <p className="text-sm  mb-1 flex items-baseline gap-2">
              <span className="w-1 h-1 bg-white text-white flex items-center justify-center text-xs shrink-0"></span>
              <span>
                <span>Apartment Size:</span> {project.ApartmentSize} Sq. Ft
              </span>
            </p>

            {/* Explore Button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="relative flex flex-col items-start mt-8 md:mt-24 my-2"
            >
              <motion.div
                className="w-20 h-px bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                style={{ originX: 0.5 }}
              />
              <div className="uppercase tracking-widest text-sm font-light hover:text-gray-300 transition-colors duration-300 my-2">
                EXPLORE
              </div>
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

        <div className="bg-white p-4 text-left text-black">
          <p className="text-sm text-gray-600">{project.Type}</p>
          <h3 className="text-xl font-bold">{project.Title}</h3>
          <p className="text-sm text-gray-600">{project.LandSize} Katha</p>
        </div>
      </div>
    </Link>
  </div>
);

const ProjectFilter = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeType, setActiveType] = useState("ALL");
  const [activeLocation, setActiveLocation] = useState("ALL");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://job-task-2-backend.vercel.app/api/v1/perfections"
        );
        const result = await response.json();

        if (result.success) {
          setProjects(result.data);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setError("Error fetching projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter options
  const categories = ["ALL", "ONGOING", "HANDOVER", "UPCOMING"];
  const types = ["ALL", "RESIDENTIAL", "COMMERCIAL"];
  const locations = ["ALL", "GULSHAN", "BASHUNDHARA"];

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category (status) - যদি ALL না হয়
    if (activeCategory !== "ALL") {
      filtered = filtered.filter(
        (project) => project.status === activeCategory
      );
    }

    // Filter by type - যদি ALL না হয়
    if (activeType !== "ALL") {
      filtered = filtered.filter(
        (project) => project.Type.toUpperCase() === activeType
      );
    }

    // Filter by location - যদি ALL না হয়
    if (activeLocation !== "ALL") {
      filtered = filtered.filter((project) => {
        const address = project.Address.toLowerCase();
        if (activeLocation === "GULSHAN") return address.includes("gulshan");
        if (activeLocation === "BASHUNDHARA")
          return (
            address.includes("bashundhara") || address.includes("bosondora")
          );
        return true;
      });
    }

    return filtered;
  }, [projects, activeCategory, activeType, activeLocation]);

  const handleDropdownClick = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleFilterSelect = (filterType: string, value: string) => {
    switch (filterType) {
      case "CATEGORY":
        setActiveCategory(value);
        break;
      case "TYPE":
        setActiveType(value);
        break;
      case "LOCATION":
        setActiveLocation(value);
        break;
    }
    setOpenDropdown(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Filter Header */}
      <div className="bg-black text-white flex border-b border-gray-700 relative z-20">
        {/* Select Category */}
        <div className="relative w-1/3 border-r border-gray-700">
          <div
            className={`flex items-center justify-center py-4 cursor-pointer text-lg ${
              activeCategory !== "ALL" ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
            onClick={() => handleDropdownClick("SELECT CATEGORY")}
          >
            SELECT CATEGORY
            <span className="absolute right-4 text-xl">
              {openDropdown === "SELECT CATEGORY" ? "×" : "+"}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={
              openDropdown === "SELECT CATEGORY"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black shadow-xl overflow-hidden"
          >
            {openDropdown === "SELECT CATEGORY" && (
              <div className="border-t border-white">
                <div className="py-3 px-6 text-sm text-gray-400 font-light text-left border-b border-gray-700">
                  SELECT CATEGORY
                </div>
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => handleFilterSelect("CATEGORY", category)}
                    className={`
                      py-3 px-6 text-sm text-left transition duration-200
                      ${
                        activeCategory === category
                          ? "bg-blue-900 font-semibold"
                          : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {category === "ALL" ? "ALL CATEGORIES" : category}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Select Type */}
        <div className="relative w-1/3 border-r border-gray-700">
          <div
            className={`flex items-center justify-center py-4 cursor-pointer text-lg ${
              activeType !== "ALL" ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
            onClick={() => handleDropdownClick("SELECT TYPE")}
          >
            SELECT TYPE
            <span className="absolute right-4 text-xl">
              {openDropdown === "SELECT TYPE" ? "×" : "+"}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={
              openDropdown === "SELECT TYPE"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black shadow-xl overflow-hidden"
          >
            {openDropdown === "SELECT TYPE" && (
              <div className="border-t border-white">
                <div className="py-3 px-6 text-sm text-gray-400 font-light text-left border-b border-gray-700">
                  SELECT TYPE
                </div>
                {types.map((type) => (
                  <div
                    key={type}
                    onClick={() => handleFilterSelect("TYPE", type)}
                    className={`
                      py-3 px-6 text-sm text-left transition duration-200
                      ${
                        activeType === type
                          ? "bg-blue-900 font-semibold"
                          : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {type === "ALL" ? "ALL TYPES" : type}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Select Location */}
        <div className="relative w-1/3">
          <div
            className={`flex items-center justify-center py-4 cursor-pointer text-lg ${
              activeLocation !== "ALL" ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
            onClick={() => handleDropdownClick("SELECT LOCATION")}
          >
            SELECT LOCATION
            <span className="absolute right-4 text-xl">
              {openDropdown === "SELECT LOCATION" ? "×" : "+"}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={
              openDropdown === "SELECT LOCATION"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black shadow-xl overflow-hidden"
          >
            {openDropdown === "SELECT LOCATION" && (
              <div className="border-t border-white">
                <div className="py-3 px-6 text-sm text-gray-400 font-light text-left border-b border-gray-700">
                  SELECT LOCATION
                </div>
                {locations.map((location) => (
                  <div
                    key={location}
                    onClick={() => handleFilterSelect("LOCATION", location)}
                    className={`
                      py-3 px-6 text-sm text-left transition duration-200
                      ${
                        activeLocation === location
                          ? "bg-blue-900 font-semibold"
                          : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {location === "ALL" ? "ALL LOCATIONS" : location}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-8">
        <div className="flex flex-wrap -m-3 justify-start">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
