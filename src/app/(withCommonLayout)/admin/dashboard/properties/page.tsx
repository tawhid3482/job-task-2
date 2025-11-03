"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useCreatePropertiesMutation,
  useGetAllPropertiesQuery,
} from "@/redux/features/properties/propertiesApi";

interface Property {
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

const PropertiesPage = () => {
  const [createProperties, { isLoading: creating }] =
    useCreatePropertiesMutation();
  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useGetAllPropertiesQuery({}, { refetchOnMountOrArgChange: true });

  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    Title: "",
    Type: "",
    Image: "",
    Orientation: "",
    Address: "",
    FrontRoad: "",
    LandSize: "",
    ApartmentSize: "",
    NumberOfUnits: "",
    NumberOfParking: "",
    NumberOfFloors: "",
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
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prev) => ({
            ...prev,
            Image: e.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Create FormData for file upload
      const submissionFormData = new FormData();
      submissionFormData.append("Title", formData.Title);
      submissionFormData.append("Type", formData.Type);
      submissionFormData.append("Orientation", formData.Orientation);
      submissionFormData.append("Address", formData.Address);
      submissionFormData.append("FrontRoad", formData.FrontRoad);
      submissionFormData.append("LandSize", formData.LandSize);
      submissionFormData.append("ApartmentSize", formData.ApartmentSize);
      submissionFormData.append("NumberOfUnits", formData.NumberOfUnits);
      submissionFormData.append("NumberOfParking", formData.NumberOfParking);
      submissionFormData.append("NumberOfFloors", formData.NumberOfFloors);

      // ✅ Image file append করুন
      if (imageFile) {
        submissionFormData.append("Image", imageFile);
      } else if (!editingProperty) {
        // New property-তে image required
        toast.error("Please select an image");
        setUploading(false);
        return;
      }

      // ✅ Debug: Console-এ check করুন কি send করছেন
      console.log("Sending FormData:");
      for (let [key, value] of submissionFormData.entries()) {
        console.log(key, value);
      }

      const result = await createProperties(submissionFormData).unwrap();

      if (result.success) {
        toast.success("Property created successfully!");
        resetForm();
        setShowForm(false);
        refetch();
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to create property");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Title: "",
      Type: "",
      Image: "",
      Orientation: "",
      Address: "",
      FrontRoad: "",
      LandSize: "",
      ApartmentSize: "",
      NumberOfUnits: "",
      NumberOfParking: "",
      NumberOfFloors: "",
    });
    setImageFile(null);
    setEditingProperty(null);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) {
      resetForm();
    }
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      Title: property.Title,
      Type: property.Type,
      Image: property.Image,
      Orientation: property.Orientation,
      Address: property.Address,
      FrontRoad: property.FrontRoad,
      LandSize: property.LandSize,
      ApartmentSize: property.ApartmentSize,
      NumberOfUnits: property.NumberOfUnits,
      NumberOfParking: property.NumberOfParking,
      NumberOfFloors: property.NumberOfFloors,
    });
    setImageFile(null); // Reset image file when editing
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-black">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Properties Management
            </h1>
            <button
              onClick={handleFormToggle}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={uploading || creating}
            >
              <span>+</span>
              <span>{showForm ? "Cancel" : "Add Property"}</span>
            </button>
          </div>

          {/* Add/Edit Property Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingProperty ? "Edit Property" : "Add New Property"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
                encType="multipart/form-data"
              >
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter property title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    required
                    value={formData.Type}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, Type: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select Type</option>
                    <option value="RESIDENTIAL">RESIDENTIAL</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image {!editingProperty && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingProperty} // New property requires image, edit doesn't
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  {formData.Image && (
                    <div className="mt-2">
                      <img
                        src={formData.Image}
                        alt="Preview"
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {editingProperty ? "Current Image" : "Image Preview"}
                      </p>
                    </div>
                  )}
                  {editingProperty && !imageFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to keep current image
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orientation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Orientation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Orientation: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="e.g., North, South, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        Address: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Full property address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Front Road *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.FrontRoad}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        FrontRoad: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="e.g., 20 feet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Land Size *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.LandSize}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        LandSize: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="e.g., 5 katha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment Size *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ApartmentSize}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ApartmentSize: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="e.g., 1200 sq ft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Units *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.NumberOfUnits}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        NumberOfUnits: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="e.g., 10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Parking *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.NumberOfParking}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        NumberOfParking: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="e.g., 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Floors *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.NumberOfFloors}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        NumberOfFloors: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="e.g., 5"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleFormToggle}
                    disabled={uploading || creating}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || creating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    {uploading || creating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {editingProperty ? "Updating..." : "Creating..."}
                      </>
                    ) : editingProperty ? (
                      "Update Property"
                    ) : (
                      "Add Property"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Properties List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  All Properties ({properties.length})
                </h2>
              </div>

              {properties.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No properties found. Add your first property!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Type
                        </th>
                        <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Status
                        </th>
                        <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                          Created At
                        </th>
                        <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property: any) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                            <img
                              src={property.Image}
                              alt={property.Title}
                              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                              onError={(e) => {
                                // Fallback if image fails to load
                                (e.target as HTMLImageElement).src =
                                  "/images/placeholder.jpg";
                              }}
                            />
                          </td>
                          <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {property.Title}
                            </div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {property.Type}
                            </div>
                            <div className="text-xs text-gray-500 md:hidden">
                              <span
                                className={`px-1 py-0.5 text-xs rounded-full ${
                                  property.status === "CONFIRMED"
                                    ? "bg-green-100 text-green-800"
                                    : property.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {property.status || "PENDING"}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                            {property.Type}
                          </td>
                          <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap hidden md:table-cell">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                property.status === "CONFIRMED"
                                  ? "bg-green-100 text-green-800"
                                  : property.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {property.status || "PENDING"}
                            </span>
                          </td>
                          <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                            {new Date(property.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEditProperty(property)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertiesPage;
