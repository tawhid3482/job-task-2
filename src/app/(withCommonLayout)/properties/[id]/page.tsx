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
} from "lucide-react"; // ✅ import all icons from lucide-react

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
    <div className="min-h-screen bg-white my-10 py-8">
      <LandownerBanner
        img="https://jcxbd.com/wp-content/uploads/2021/09/10-scaled-1.jpg"
        title="Properties"
      />

      <N71LakeCondos />

      <div className="container mx-auto px-4 my-24">
        {/* Title Section */}
        <div className="text-center my-20 uppercase">
          <motion.p
            className="text-3xl font-light uppercase tracking-widest text-black"
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
        <div className=" max-w-7xl mx-auto flex flex-col lg:flex-row items-start ">
          {/* Left: Project Image */}
          <div className="relative lg:w-1/2  ">
            <img
              src={project.Image}
              alt={project.Title}
              className="md:h-[690px] md:w-[498px] object-cover"
            />
          </div>

          {/* Right: Project Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="w-full">
              {glanceFeatures.map((feature) => (
                <div key={feature.name} className="flex items-center py-2.5">
                  <feature.icon className="w-8 h-8 text-gray-700 shrink-0 mr-12" />
                  <div className="font-semibold text-[#003C8C] w-48 shrink-0 ml-4 mr-20">
                    {feature.name}
                  </div>
                  <div className="flex items-center ml-2 space-x-2">
                    <span className="text-gray-900">:</span>
                    <span className="font-normal text-gray-700">
                      {project[feature.value]}
                      {feature.unit || ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeaturesAmenities></FeaturesAmenities>
      <Video></Video>
      <GalleryPage></GalleryPage>
      <Enquiry></Enquiry>
      <Testimonials></Testimonials>
      <OurAwardsandRecognition></OurAwardsandRecognition>
    </div>
  );
}
