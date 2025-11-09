"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/auth.services";
import Sidebar from "@/components/shared/admin/Sidebar";
import Topbar from "@/components/shared/admin/TopBar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  // If not logged in, don't render anything (will redirect)
  if (!isLoggedIn()) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 my-24">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}