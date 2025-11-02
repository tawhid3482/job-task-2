/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Testimonial {
  id: string;
  content: string;
  name: string;
  Image: string;
  status: string;
  createdAt: string;
}

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    name: "",
    Image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTestimonials();
  }, [router]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        "https://job-task-2-backend.vercel.app/api/v1/testimonial"
      );
      const result = await response.json();
      if (result.success) {
        setTestimonials(result.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          setFormData((prev) => ({ ...prev, Image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const testimonialData = { ...formData };

      const response = await fetch(
        "https://job-task-2-backend.vercel.app/api/v1/testimonial/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testimonialData),
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchTestimonials();
        resetForm();
        setShowForm(false);
        toast.success("Testimonial added successfully!");
      } else {
        toast.error("Error saving testimonial: " + result.message);
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Error saving testimonial");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      content: "",
      name: "",
      Image: "",
    });
    setImageFile(null);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) resetForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 my-24 text-black">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-full md:w-64 space-y-6 py-4 md:py-7 px-2 md:px-4">
        <div className="text-white flex items-center justify-center md:justify-start space-x-2 px-4">
          <span className="text-xl md:text-2xl font-extrabold">
            Admin Panel
          </span>
        </div>
        <nav className="space-y-1 md:space-y-2">
          <a
            href="/admin/dashboard"
            className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-sm md:text-base"
          >
            Dashboard
          </a>
          <a
            href="/admin/properties"
            className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-sm md:text-base"
          >
            Properties
          </a>
          <a
            href="/admin/slider"
            className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-sm md:text-base"
          >
            Slider
          </a>
          <a
            href="/admin/testimonial"
            className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white bg-gray-700 text-sm md:text-base"
          >
            Testimonial ({testimonials.length})
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 space-y-3 sm:space-y-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Testimonials Management
            </h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={handleFormToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                {showForm ? "Cancel" : "Add New Testimonial"}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
          {/* Add Testimonial Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                Add New Testimonial
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-3 sm:gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  {formData.Image && (
                    <div className="mt-2">
                      <img
                        src={formData.Image}
                        alt="Preview"
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={handleFormToggle}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {uploading ? "Saving..." : "Add Testimonial"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Testimonials List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 sm:p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                All Testimonials ({testimonials.length})
              </h2>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {testimonials.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <img
                            src={t.Image}
                            alt={t.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {t.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          <div className="line-clamp-2">{t.content}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              t.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : t.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tablet Table View */}
              <div className="hidden sm:block md:hidden overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {testimonials.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <img
                            src={t.Image}
                            alt={t.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {t.name}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500">
                          <div className="line-clamp-1">{t.content}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              t.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : t.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden space-y-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={t.Image}
                        alt={t.name}
                        className="w-12 h-12 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-900">
                            {t.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full shrink-0 ml-2 ${
                              t.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : t.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {t.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created: {new Date(t.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestimonialsPage;
