/* eslint-disable @next/next/no-img-element */
// app/admin/properties/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    Title: '',
    Type: '',
    Image: '',
    Orientation: '',
    Address: '',
    FrontRoad: '',
    LandSize: '',
    ApartmentSize: '',
    NumberOfUnits: '',
    NumberOfParking: '',
    NumberOfFloors: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProperties();
  }, [router]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://job-task-2-backend.vercel.app/api/v1/perfections');
      const result = await response.json();
      
      if (result.success) {
        setProperties(result.data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData(prev => ({ ...prev, Image: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.Image;
      if (imageFile) {
        imageUrl = formData.Image;
      }

      const propertyData = {
        ...formData,
        Image: imageUrl
      };

      const url = editingProperty 
        ? `https://job-task-2-backend.vercel.app/api/v1/perfections/${editingProperty.id}`
        : 'https://job-task-2-backend.vercel.app/api/v1/perfections/create';

      const method = editingProperty ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      const result = await response.json();

      if (result.success) {
        await fetchProperties();
        resetForm();
        setShowForm(false);
        setEditingProperty(null);
        toast.success(editingProperty ? 'Property updated successfully!' : 'Property added successfully!');
      } else {
        toast.error('Error saving property: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Error saving property');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Title: '',
      Type: '',
      Image: '',
      Orientation: '',
      Address: '',
      FrontRoad: '',
      LandSize: '',
      ApartmentSize: '',
      NumberOfUnits: '',
      NumberOfParking: '',
      NumberOfFloors: ''
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 md:my-24 text-black">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="bg-gray-800 text-white w-full md:w-64 space-y-6 py-4 md:py-7 px-2 md:px-4">
        <div className="text-white flex items-center justify-center md:justify-start space-x-2 px-4">
          <span className="text-xl md:text-2xl font-extrabold">Admin Panel</span>
        </div>
        <nav className="space-y-1 md:space-y-2">
          <a href="/admin/dashboard" className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-sm md:text-base">
            Dashboard
          </a>
          <a href="/admin/properties" className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white bg-gray-700 text-sm md:text-base">
            Properties ({properties.length})
          </a>
          <a href="/admin/slider" className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-sm md:text-base">
            Slider
          </a>
          <a href="/admin/testimonial" className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white text-sm md:text-base">
            Testimonial
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 space-y-3 sm:space-y-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Properties Management</h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={handleFormToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                {showForm ? 'Cancel' : 'Add New Property'}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  router.push('/login');
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
          {/* Add/Edit Property Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.Title}
                    onChange={(e) => setFormData(prev => ({ ...prev, Title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    required
                    value={formData.Type}
                    onChange={(e) => setFormData(prev => ({ ...prev, Type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select Type</option>
                    <option value="RESIDENTIAL">RESIDENTIAL</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
                  <input
                    type="text"
                    required
                    value={formData.Orientation}
                    onChange={(e) => setFormData(prev => ({ ...prev, Orientation: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={formData.Address}
                    onChange={(e) => setFormData(prev => ({ ...prev, Address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Front Road</label>
                  <input
                    type="text"
                    required
                    value={formData.FrontRoad}
                    onChange={(e) => setFormData(prev => ({ ...prev, FrontRoad: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Land Size</label>
                  <input
                    type="text"
                    required
                    value={formData.LandSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, LandSize: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartment Size</label>
                  <input
                    type="text"
                    required
                    value={formData.ApartmentSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, ApartmentSize: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Units</label>
                  <input
                    type="text"
                    required
                    value={formData.NumberOfUnits}
                    onChange={(e) => setFormData(prev => ({ ...prev, NumberOfUnits: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Parking</label>
                  <input
                    type="text"
                    required
                    value={formData.NumberOfParking}
                    onChange={(e) => setFormData(prev => ({ ...prev, NumberOfParking: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
                  <input
                    type="text"
                    required
                    value={formData.NumberOfFloors}
                    onChange={(e) => setFormData(prev => ({ ...prev, NumberOfFloors: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
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
                    {uploading ? 'Saving...' : (editingProperty ? 'Update Property' : 'Add Property')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Properties List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 sm:p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">All Properties ({properties.length})</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                          <img 
                            src={property.Image} 
                            alt={property.Title}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{property.Title}</div>
                          <div className="text-xs text-gray-500 sm:hidden">{property.Type}</div>
                          <div className="text-xs text-gray-500 md:hidden">
                            <span className={`px-1 py-0.5 text-xs rounded-full ${
                              property.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                              property.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {property.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {property.Type}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap hidden md:table-cell">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            property.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                            property.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {new Date(property.createdAt).toLocaleDateString()}
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

export default PropertiesPage;