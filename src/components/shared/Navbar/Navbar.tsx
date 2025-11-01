/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect, useCallback } from "react";

const logoUrl = "https://jcxbd.com/wp-content/uploads/2021/09/logo.svg";

const menuItems = [
  "Residential",
  "Commercial",
  "Home",
  "About",
  "Management-Team",
  "Properties",
  "Concerns",
  "Landowner",
  "Buyer",
  "Blogs",
  "News&Events",
  "Gallery",
  "Contact",
  "CSR",
];

// Utility function
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const menuClickSound = "/sounds/click.mp3";

const PhoneIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-5.6-5.6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.74a17.5 17.5 0 0 0 .61 1.74c.48.91-.18 2-1 2.55L6.5 10.28c.79 2 .57 4.14 1.35 5.16s2 1.34 4 1.34s4.21-.36 5.16-1.35l1.08-.68c.55-.81 1.63-1.4 2.55-1A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMenuToggle = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
    setOpen((s) => !s);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(menuClickSound);
    audioRef.current.preload = "auto";
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-sm text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center">
            <img src={logoUrl} alt="JCXBD Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center gap-16">
            <div className="hidden md:flex justify-between items-center gap-12">
              <Link
                href="/residential"
                className="uppercase text-sm font-medium hover:text-sky-300 transition relative group"
              >
                Residential
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-400 transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
              <span className="text-sm text-white/70">|</span>
              <Link
                href="/commercial"
                className="uppercase text-sm font-medium hover:text-sky-300 transition relative group"
              >
                Commercial
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-400 transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>

              <div className="flex items-center gap-3">
                <PhoneIcon className="text-white hover:text-sky-300 transition" />
                <a
                  href="tel:16777"
                  className="text-sm font-light text-white hover:text-sky-300 transition"
                >
                  16777
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <p className="uppercase text-sm font-medium transition">MENU</p>

              {/* Hamburger / Close */}
              <div className="relative group">
                {!open ? (
                  <button
                    aria-expanded={open}
                    aria-controls="jcxbd-menu"
                    onClick={handleMenuToggle}
                    className="flex flex-col justify-between w-8 h-4 p-0 bg-transparent cursor-pointer focus:outline-none transition-all duration-300"
                  >
                    <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-full"></span>
                    <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-[70%] group-hover:self-center"></span>
                    <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-[40%] group-hover:self-end"></span>
                  </button>
                ) : (
                  <button
                    onClick={handleCloseMenu}
                    className="flex items-center justify-center w-10 h-10 p-2 bg-transparent cursor-pointer focus:outline-none transition-all duration-300 border-2 border-white rounded-full hover:border-sky-300"
                  >
                    <CloseIcon className="text-white hover:text-sky-300 transition w-6 h-6" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {open && (
                  <div
                    id="jcxbd-menu"
                    className="origin-top-right absolute right-0 -mt-15 w-[700px] p-10 rounded-md shadow-2xl bg-[#2D2D2D] text-white ring-1 ring-gray-600 ring-opacity-50 z-50 transition-all duration-300 max-h-screen overflow-y-auto"
                  >
                    {/* Close Button inside menu */}
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={handleCloseMenu}
                        className="flex items-center justify-center w-10 h-10 p-2 bg-transparent cursor-pointer focus:outline-none transition-all duration-300 border-2 border-white rounded-full hover:border-sky-300"
                      >
                        <CloseIcon className="text-white transition w-6 h-6" />
                      </button>
                    </div>

                    {/* Dropdown Links */}
                    <div className="py-4 px-6">
                      <div className="flex justify-between gap-10">
                        {/* Left Column */}
                        <div className="flex flex-col gap-2 w-1/3 border-r border-gray-700 pr-4">
                          <Link
                            href={`/residential`}
                            onClick={handleCloseMenu}
                            className="relative text-2xl font-medium text-white after:content-[''] after:block after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full after:mt-1"
                          >
                            Residential
                          </Link>

                          <Link
                            href={`/
commercial`}
                            onClick={handleCloseMenu}
                            className="relative text-2xl font-medium text-white after:content-[''] after:block after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full after:mt-1 "
                          >
                            Commercial
                          </Link>
                        </div>

                        {/* Right Column */}
                        <div className="grid grid-cols-1 gap-3 w-2/3">
                          {menuItems
                            .filter(
                              (item) =>
                                item !== "Residential" && item !== "Commercial"
                            )
                            .map((item) => (
                              <Link
                                key={item}
                                href={
                                  item.toLowerCase() === "home"
                                    ? "/"
                                    : `/${item.toLowerCase()}`
                                }
                                onClick={handleCloseMenu}
                                className="relative w-32  text-2xl font-medium text-white after:content-[''] after:block after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full after:mt-1 "
                              >
                                {item}
                              </Link>
                            ))}
                        </div>
                      </div>

                      {/* Separator */}
                      <div className="border-t border-gray-600 my-4"></div>

                      {/* Footer */}
                      <div className="text-sm text-gray-300">
                        <div className="mb-4">
                          <h3 className="font-semibold text-white mb-2">
                            JCX Business Tower
                          </h3>
                          <p>Plot 1136/A, Japan Street, Block # I,</p>
                          <p>Bashundhara R/A, Dhaka -1229, Bangladesh.</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          <p>© 2025 JCXBD | All Rights Reserved.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <p className="uppercase text-sm font-medium hover:text-sky-300 transition">
              MENU
            </p>
            <div className="relative group">
              {!open ? (
                <button
                  aria-expanded={open}
                  aria-controls="jcxbd-menu"
                  onClick={handleMenuToggle}
                  className="flex flex-col justify-between w-8 h-6 p-0 bg-transparent cursor-pointer focus:outline-none transition-all duration-300"
                >
                  <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-full"></span>
                  <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-[70%] group-hover:self-center"></span>
                  <span className="block h-px bg-white rounded-full w-full transition-all duration-300 group-hover:w-[40%] group-hover:self-end"></span>
                </button>
              ) : (
                <button
                  onClick={handleCloseMenu}
                  className="flex items-center justify-center w-10 h-10 p-2 bg-transparent cursor-pointer focus:outline-none transition-all duration-300 border-2 border-white rounded-full hover:border-sky-300"
                >
                  <CloseIcon className="text-white hover:text-sky-300 transition w-6 h-6" />
                </button>
              )}

              {/* Dropdown Menu */}
              {open && (
                <div
                  id="jcxbd-menu"
                  className="origin-top-right absolute right-0 -mt-15 w-60 p-5 rounded-md shadow-xl bg-[#2D2D2D] text-white ring-1 ring-gray-600 ring-opacity-50 z-50 transition-all duration-300 max-h-screen overflow-y-auto"
                >
                  {/* Close Button inside menu */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleCloseMenu}
                      className="flex items-center justify-center w-10 h-10 p-2 bg-transparent cursor-pointer focus:outline-none transition-all duration-300 border-2 border-white rounded-full hover:border-sky-300"
                    >
                      <CloseIcon className="text-white transition w-6 h-6" />
                    </button>
                  </div>

                  {/* Dropdown Links */}
                  <div className="py-4 px-6">
                    <div className="flex justify-between gap-10">
                      {/* Right Column */}
                      <div className="grid grid-cols-1 gap-3 w-2/3">
                        {menuItems
                          .filter(
                            (item) =>
                              item !== "Residential" && item !== "Commercial"
                          )
                          .map((item) => (
                            <Link
                              key={item}
                              href={
                                item.toLowerCase() === "home"
                                  ? "/"
                                  : `/${item.toLowerCase()}`
                              }
                              onClick={handleCloseMenu}
                              className="relative w-32  text-2xl font-medium text-white after:content-[''] after:block after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full after:mt-1 "
                            >
                              {item}
                            </Link>
                          ))}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-gray-600 my-4"></div>

                    {/* Footer */}
                    <div className="text-sm text-gray-300">
                      <div className="mb-4">
                        <h3 className="font-semibold text-white mb-2">
                          JCX Business Tower
                        </h3>
                        <p>Plot 1136/A, Japan Street, Block # I,</p>
                        <p>Bashundhara R/A, Dhaka -1229, Bangladesh.</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        <p>© 2025 JCXBD | All Rights Reserved.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
