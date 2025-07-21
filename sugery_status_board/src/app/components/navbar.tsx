"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegCalendar, FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Status Board", href: "/status" },
  ];

  return (
    <>
      <nav className="w-full py-4 px-4 shadow-md bg-white flex justify-between items-center relative z-30">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-[8dvh] h-[8dvh] bg-accentMain2 rounded-sm" />
          <div className="flex flex-col justify-center leading-tight">
            <h1 className="text-lg font-bold font-header text-gray-800">
              Live Orbit
            </h1>
            <p className="text-sm text-gray-500">Patient Progress Tracking</p>
          </div>
        </Link>

        {/* Date Display (Desktop Only) */}
        <div className="hidden sm:flex items-center space-x-2 text-gray-700">
          <FaRegCalendar />
          <p className="text-sm md:text-base">{date}</p>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-3">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "rounded px-3 py-1 text-sm transition",
                pathname === href
                  ? "bg-accentMain text-white font-semibold"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger for Mobile */}
        <FaBars
          className="sm:hidden text-2xl text-gray-800 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      {/* Overlay and Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0  bg-opacity-40 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 w-3/4 sm:hidden h-full bg-[#253237] text-white p-6 z-30 shadow-lg">
            <p className="text-sm text-center mb-4 md:text-base">{date}</p>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg text-accentMain font-bold tracking-wide">Menu</h2>
              <FaTimes
                className="text-2xl text-accentMain cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <nav className="flex flex-col space-y-5 text-base">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "transition duration-150 pb-1",
                    pathname === href
                      ? "text-white font-semibold border-b-2 border-accentMain"
                      : "text-white hover:text-accentMain"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
