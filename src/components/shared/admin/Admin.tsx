/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/admin/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardStats {
  usersCount: number;
  propertiesCount: number;
  slidersCount: number;
  testimonialsCount: number;
  newsCount: number;
  blogsCount: number;
  photosCount: number;
  videosCount: number;
  concernsCount: number;
  enquiriesCount: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    usersCount: 0,
    propertiesCount: 0,
    slidersCount: 0,
    testimonialsCount: 0,
    newsCount: 0,
    blogsCount: 0,
    photosCount: 0,
    videosCount: 0,
    concernsCount: 0,
    enquiriesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const endpoints = [
        {
          key: "usersCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/users",
        },
        {
          key: "propertiesCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/perfections",
        },
        {
          key: "slidersCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/slider",
        },
        {
          key: "testimonialsCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/testimonial",
        },
        {
          key: "newsCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/news",
        },
        {
          key: "blogsCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/blogs",
        },
        {
          key: "photosCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/media/photo",
        },
        {
          key: "videosCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/media/video",
        },
        {
          key: "concernsCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/concerns",
        },
        {
          key: "enquiriesCount",
          url: "https://job-task-2-backend.vercel.app/api/v1/enquiry",
        },
      ];

      const promises = endpoints.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint.url);
          const result = await response.json();
          return {
            key: endpoint.key,
            count: result.success ? result.data.length : 0,
          };
        } catch (error) {
          console.error(`Error fetching ${endpoint.key}:`, error);
          return {
            key: endpoint.key,
            count: 0,
          };
        }
      });

      const results = await Promise.all(promises);

      const newStats: any = {};
      results.forEach((result) => {
        newStats[result.key] = result.count;
      });

      setStats(newStats);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <div className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">Admin Panel</span>
        </div>

        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white bg-gray-700"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/properties"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            Properties ({stats.propertiesCount})
          </Link>

          <Link
            href="/admin/slider"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            Slider ({stats.slidersCount})
          </Link>

          <Link
            href="/admin/testimonial"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            Testimonial ({stats.testimonialsCount})
          </Link>

         

         

          {/* <div className="pt-4">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase">
              Customer Support
            </p>
            <div className="mt-2 px-4 py-2 text-sm bg-gray-700 rounded">
              <p>
                Ask your query, place requests or important items. Our support
                team will contact 24/7 to you.
              </p>
            </div>
          </div> */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Q Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.propertiesCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Testimonials</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.testimonialsCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Sliders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.slidersCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.usersCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total News</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.newsCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Blogs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.blogsCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Media Files</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.photosCount + stats.videosCount}
                  </p>
                  <p className="text-xs text-gray-500">
                    ({stats.photosCount} photos, {stats.videosCount} videos)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inbox Section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activities
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-sm font-medium text-gray-900">
                    Concerns & Enquiries
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Concerns: {stats.concernsCount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Enquiries: {stats.enquiriesCount}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <button className="text-blue-600 text-sm hover:text-blue-800">
                      View details
                    </button>
                    <span className="text-xs text-gray-400">
                      Updated just now
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-sm font-medium text-gray-900">
                    Content Summary
                  </p>
                  <p className="text-sm text-gray-500">
                    You have {stats.propertiesCount} properties,{" "}
                    {stats.testimonialsCount} testimonials, and{" "}
                    {stats.slidersCount} sliders
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <button className="text-blue-600 text-sm hover:text-blue-800">
                      Manage Content
                    </button>
                    <span className="text-xs text-gray-400">Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Properties</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats.propertiesCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Testimonials</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats.testimonialsCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Sliders</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats.slidersCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Users</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats.usersCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">News</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats.newsCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Blogs</span>
                  <span className="text-sm font-bold text-gray-900">
                    {stats.blogsCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
