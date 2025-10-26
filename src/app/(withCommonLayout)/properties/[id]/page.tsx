// app/projects/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";

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
  const id = params.id as string;
  
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
          const foundProject = result.data.find((p: Project) => p.id === id);
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError("Project not found");
          }
        } else {
          setError("Failed to fetch project");
        }
      } catch (err) {
        setError("Error fetching project");
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error || "Project not found"}</div>
        <Link href="/" className="ml-4 text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
       <LandownerBanner
        img={
          "https://jcxbd.com/wp-content/uploads/2021/09/10-scaled-1.jpg"
        }
        title="Properties"
        // text="find your nest"
      ></LandownerBanner>  

      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Project Image */}
          <div className="relative h-96">
            <img
              src={project.Image}
              alt={project.Title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {project.Title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">{project.Type}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Orientation
                    </h3>
                    <p className="text-lg text-gray-900">{project.Orientation}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Address
                    </h3>
                    <p className="text-lg text-gray-900">{project.Address}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Front Road
                    </h3>
                    <p className="text-lg text-gray-900">{project.FrontRoad}</p>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Specifications
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Land Size
                    </h3>
                    <p className="text-xl font-bold text-gray-900">{project.LandSize} Katha</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Apartment Size
                    </h3>
                    <p className="text-xl font-bold text-gray-900">{project.ApartmentSize} Sq. Ft</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Number of Units
                    </h3>
                    <p className="text-xl font-bold text-gray-900">{project.NumberOfUnits}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Number of Parking
                    </h3>
                    <p className="text-xl font-bold text-gray-900">{project.NumberOfParking}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Number of Floors
                    </h3>
                    <p className="text-xl font-bold text-gray-900">{project.NumberOfFloors}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Status
                    </h3>
                    <p className="text-xl font-bold text-gray-900">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact/Inquiry Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interested in this Project?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact us for more information about {project.Title}
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}