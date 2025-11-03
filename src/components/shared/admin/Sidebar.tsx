import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
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
          href="/admin/dashboard/properties"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          Properties
        </Link>
        <Link
          href="/admin/slider"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          Slider
        </Link>
        <Link
          href="/admin/testimonial"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          Testimonial
        </Link>
      </nav>
    </div>
  );
}
