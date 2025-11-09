"use client";

// import { isLoggedIn } from "@/services/auth.services";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

export default function DashboardPage() {
  // const router = useRouter();
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
    
  //   if (!isLoggedIn()) {
  //     router.push("/login");
  //   }
  // }, [router]);

  // if (!isClient || !isLoggedIn()) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white px-10 py-14 rounded-3xl shadow-md border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome to Your Dashboard 🎉
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          You're successfully logged in. Explore and manage your content easily
          from here.
        </p>
      </div>
    </div>
  );
}