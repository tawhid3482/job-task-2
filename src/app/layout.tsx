"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CurtainTransition from "@/components/PageTransition";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-7xl mx-auto ">
          <Navbar />
          {children}

          <CurtainTransition />
          <Footer />
        </div>
      </body>
    </html>
  );
}
