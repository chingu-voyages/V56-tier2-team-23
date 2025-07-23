"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegCalendar, FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import Logo from "./icons/Logo";

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
    { label: "Patient Information", href: "/Dashboard/admin" },
    { label: "Status Update", href: "/Dashboard/doctor" },
    { label: "Status Board", href: "/Dashboard/visitor" },
  ];

  return (
    <>
      <nav className="w-full py-4 px-6 bg-viking-50 flex justify-between items-center relative z-30 shadow-md">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex flex-col leading-tight">
            <Logo color="blue" width={150} height={40} />
            <p className="text-xs sm:text-sm text-viking-700 mt-1">
              Patient Progress Tracking
            </p>
          </div>
        </Link>

        {/* Date Display (Desktop Only) */}
        <div className="hidden sm:flex items-center space-x-2 text-viking-700">
          <FaRegCalendar className="text-viking-600" />
          <p className="text-sm md:text-base">{date}</p>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-4">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "rounded-sm px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                pathname === href
                  ? "bg-viking-600 text-white shadow-lg"
                  : "text-viking-800 hover:bg-viking-100 hover:text-viking-900"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger for Mobile */}
        <FaBars
          className="sm:hidden text-2xl text-viking-800 cursor-pointer fixed right-6"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      {/* Overlay and Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 w-3/4 sm:hidden h-full bg-viking-950 text-white p-6 z-30 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
            <p className="text-sm text-center mb-6 text-viking-300 md:text-base">
              {date}
            </p>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl text-viking-100 font-bold tracking-wide">
                Menu
              </h2>
              <FaTimes
                className="text-2xl text-viking-100 cursor-pointer hover:text-viking-300"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <nav className="flex flex-col space-y-6 text-lg">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "transition duration-150 pb-1 border-b border-viking-800",
                    pathname === href
                      ? "text-viking-100 font-semibold"
                      : "text-viking-300 hover:text-viking-100"
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
