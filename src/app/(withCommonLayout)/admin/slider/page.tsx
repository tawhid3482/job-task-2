/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// app/admin/slider/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Slider {
  id: string;
  title: string;
  Image: string;
  text: string;
  status: string;
  createdAt: string;
}

const SliderPage = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
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
    fetchSliders();
  }, [router]);

  const fetchSliders = async () => {
    try {
      const response = await fetch(
        "https://job-task-2-backend.vercel.app/api/v1/slider"
      );
      const result = await response.json();

      if (result.success) {
        setSliders(result.data);
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
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
      const sliderData = { ...formData };

      const response = await fetch(
        "https://job-task-2-backend.vercel.app/api/v1/slider/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sliderData),
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchSliders();
        resetForm();
        setShowForm(false);
        toast.success("Slider added successfully!");
      } else {
        toast.error("Error saving slider: " + result.message);
      }
    } catch (error) {
      console.error("Error saving slider:", error);
      toast.error("Error saving slider");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      text: "",
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
        <div className="text-xl text-gray-600">Loading sliders...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 md:my-24 text-black">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
        <div className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">Admin Panel</span>
        </div>
        <nav className="space-y-2">
          <a
            href="/admin/dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </a>
          <a
            href="/admin/properties"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            Properties
          </a>
          <a
            href="/admin/slider"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white bg-gray-700"
          >
            Slider ({sliders.length})
          </a>
          <a
            href="/admin/testimonial"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            Testimonial
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Slider Management
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFormToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showForm ? "Cancel" : "Add New Slider"}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Add Slider Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Add New Slider</h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text/Description
                  </label>
                  <textarea
                    required
                    value={formData.text}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        text: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.Image && (
                    <div className="mt-2">
                      <img
                        src={formData.Image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleFormToggle}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {uploading ? "Saving..." : "Add Slider"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sliders List - Table Layout like Testimonials */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                All Sliders ({sliders.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Text/Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sliders.map((slider) => (
                      <tr key={slider.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={slider.Image}
                            alt={slider.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {slider.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {slider.text}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(slider.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SliderPage;