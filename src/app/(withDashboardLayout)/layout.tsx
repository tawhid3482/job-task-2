"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/auth.services";
import Sidebar from "@/components/shared/admin/Sidebar";
import Topbar from "@/components/shared/admin/TopBar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();

  // Login check
  if (!isLoggedIn()) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
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
