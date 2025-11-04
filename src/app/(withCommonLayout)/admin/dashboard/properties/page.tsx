"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useCreatePropertiesMutation,
  useDeletePropertiesMutation,
  useGetAllPropertiesQuery,
  useUpdatePropertiesMutation,
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
  const [updateProperties, { isLoading: updating }] =
    useUpdatePropertiesMutation();
  const [deleteProperties, { isLoading: deleting }] =
    useDeletePropertiesMutation();

  const {
    data: propertiesData,
    isLoading,
    refetch,
  } = useGetAllPropertiesQuery(undefined, { refetchOnMountOrArgChange: true });

  const properties: Property[] = propertiesData?.data || propertiesData || [];

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
    if (!token) router.push("/login");
  }, [router]);

  // ✅ Image Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Preview only
      setFormData((prev) => ({
        ...prev,
        Image: URL.createObjectURL(file),
      }));
    }
  };

  // ✅ Upload image to CPANEL
  const uploadImageToCPanel = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        "https://job-task-2-backend.vercel.app/api/v1/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      return data.url;
    } catch (error) {
      toast.error("Image upload failed");
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.Image;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImageToCPanel(imageFile);
      } else if (!editingProperty) {
        toast.error("Please select an image");
        setUploading(false);
        return;
      }

      const propertyData = {
        Title: formData.Title,
        Type: formData.Type,
        Orientation: formData.Orientation,
        Address: formData.Address,
        FrontRoad: formData.FrontRoad,
        LandSize: formData.LandSize,
        ApartmentSize: formData.ApartmentSize,
        NumberOfUnits: formData.NumberOfUnits,
        NumberOfParking: formData.NumberOfParking,
        NumberOfFloors: formData.NumberOfFloors,
        Image: imageUrl,
      };

      if (editingProperty) {
        await updateProperties({
          id: editingProperty.id,
          data: propertyData,
        }).unwrap();
        toast.success("Property updated successfully!");
      } else {
        await createProperties(propertyData).unwrap();
        toast.success("Property created successfully!");
      }

      resetForm();
      setShowForm(false);
      refetch();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete Property
  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await deleteProperties(id).unwrap();
      toast.success("Property deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete property");
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
    if (showForm) resetForm();
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
    setImageFile(null);
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-black">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Properties Management
            </h1>
            <button
              onClick={handleFormToggle}
              className="bg-[#7A3E1B] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={uploading || creating || updating}
            >
              <span>+</span>
              <span>{showForm ? "Cancel" : "Add Property"}</span>
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingProperty ? "Edit Property" : "Add New Property"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
              >
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Title}
                    onChange={(e) =>
                      setFormData({ ...formData, Title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter property title"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    required
                    value={formData.Type}
                    onChange={(e) =>
                      setFormData({ ...formData, Type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                {/* Orientation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orientation *
                  </label>
                  <select
                    required
                    value={formData.Orientation}
                    onChange={(e) =>
                      setFormData({ ...formData, Orientation: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Orientation</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North-East">North-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-East">South-East</option>
                    <option value="South-West">South-West</option>
                  </select>
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image {!editingProperty && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingProperty}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {formData.Image && (
                    <div className="mt-2">
                      <img
                        src={formData.Image}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {editingProperty
                          ? "Current Image - Select new image to update"
                          : "Preview"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Other Fields */}
                {[
                  "Address",
                  "FrontRoad",
                  "LandSize",
                  "ApartmentSize",
                  "NumberOfUnits",
                  "NumberOfParking",
                  "NumberOfFloors",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.replace(/([A-Z])/g, " $1").trim()} *
                    </label>
                    <input
                      type="text"
                      required
                      value={(formData as any)[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder={`Enter ${field
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}`}
                    />
                  </div>
                ))}

                <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleFormToggle}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                    disabled={uploading || creating || updating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || creating || updating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    {(uploading || creating || updating) && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {editingProperty ? "Update Property" : "Add Property"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Property Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                All Properties ({properties?.length || 0})
              </h2>
              {!properties?.length ? (
                <div className="text-center py-8 text-gray-500">
                  No properties found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Image
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Title
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Address
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((p: Property) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <img
                              src={p.Image}
                              alt={p.Title}
                              className="w-14 h-14 rounded-md object-cover"
                            />
                          </td>
                          <td className="px-4 py-2 font-medium">{p.Title}</td>
                          <td className="px-4 py-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {p.Type}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">
                            {p.Address}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                p.status === "CONFIRMED"
                                  ? "bg-green-100 text-green-800"
                                  : p.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {p.status || "PENDING"}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditProperty(p)}
                                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                disabled={deleting}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProperty(p.id)}
                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                                disabled={deleting}
                              >
                                {deleting ? "Deleting..." : "Delete"}
                              </button>
                            </div>
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
