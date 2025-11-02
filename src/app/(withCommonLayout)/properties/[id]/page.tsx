"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Map,
  Waypoints,
  Ruler,
  Layout,
  Building2,
  ParkingSquare,
  Menu,
} from "lucide-react"; 

import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import N71LakeCondos from "@/components/shared/Properties/propertiesText";
import FeaturesAmenities from "@/components/shared/Properties/PropertiesFeatures/PropertiesFeatures";
import Video from "@/components/shared/Properties/PropertiesFeatures/Vedio";
import GalleryPage from "@/components/shared/Properties/PropertiesFeatures/PropertiesPhoto";
import Enquiry from "@/components/shared/Landowner/Enquiry";
import Testimonials from "@/components/shared/Home/Testimonials";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";

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

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://job-task-2-backend.vercel.app/api/v1/perfections"
        );
        const result = await response.json();

        if (result.success) {
          const foundProject = result.data.find(
            (p: Project) => String(p.id) === String(id)
          );
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError("Project not found");
          }
        } else {
          setError("Failed to fetch project");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Error fetching project");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading project details...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
        <div className="text-xl text-red-600 mb-4">
          {error || "Project not found"}
        </div>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  interface FeatureItem {
    icon: React.ElementType;
    name: string;
    value: keyof Project;
    unit?: string;
  }

  const glanceFeatures: FeatureItem[] = [
    { icon: Home, name: "Type", value: "Type" },
    { icon: MapPin, name: "Orientation", value: "Orientation" },
    { icon: Map, name: "Address", value: "Address" },
    { icon: Waypoints, name: "Front Road", value: "FrontRoad" },
    { icon: Ruler, name: "Land Size", value: "LandSize", unit: " Katha" },
    {
      icon: Layout,
      name: "Apartment Size",
      value: "ApartmentSize",
      unit: " sft (approx.)",
    },
    { icon: Building2, name: "Number of Units", value: "NumberOfUnits" },
    { icon: ParkingSquare, name: "Number of Parking", value: "NumberOfParking" },
    { icon: Menu, name: "Number of Floors", value: "NumberOfFloors" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandownerBanner
        img="https://jcxbd.com/wp-content/uploads/2021/09/10-scaled-1.jpg"
        title="Properties"
      />

      <N71LakeCondos />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12 md:my-24">
        {/* Title Section */}
        <div className="text-center my-12 md:my-20 uppercase">
          <motion.p
            className="text-2xl sm:text-3xl font-light uppercase tracking-widest text-black"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            at a glance
          </motion.p>
          <motion.div
            className="mx-auto mt-2 h-1 w-14 bg-blue-600"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Project Details Section */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left: Project Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-full">
              <img
                src={project.Image}
                alt={project.Title}
                className="w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:h-[690px] lg:max-h-none object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right: Project Info */}
          <div className="w-full lg:w-1/2">
            <div className="w-full space-y-4 sm:space-y-6">
              {glanceFeatures.map((feature) => (
                <motion.div 
                  key={feature.name} 
                  className="flex items-start sm:items-center py-3 sm:py-4 border-b border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 shrink-0 mr-4 sm:mr-6 lg:mr-12" />
                  <div className="flex flex-col sm:flex-row sm:items-center w-full">
                    <div className="font-semibold text-[#003C8C] text-sm sm:text-base w-32 sm:w-40 lg:w-48 shrink-0 mb-1 sm:mb-0">
                      {feature.name}
                    </div>
                    <div className="flex items-center space-x-2 sm:ml-4 lg:ml-8">
                      <span className="text-gray-900 hidden sm:inline">:</span>
                      <span className="font-normal text-gray-700 text-sm sm:text-base wrap-break-word">
                        {project[feature.value]}
                        {feature.unit || ""}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeaturesAmenities />
      <Video />
      <GalleryPage />
      <Enquiry />
      <Testimonials />
      <OurAwardsandRecognition />
    </div>
  );
}