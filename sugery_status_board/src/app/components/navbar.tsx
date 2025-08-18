"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegCalendar, FaBars, FaTimes } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import clsx from "clsx";
import { useAuthStore } from "@/Features/auth/store/useAuthStore";
import { navConfig } from "@/Features/auth/config/navconfig";
import { useAuth } from "@/Features/auth/hooks/useAuth";
import { SvgLogo, SvgUserplus } from "@/components/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const userRole = useAuthStore(
    (state) => state.role
  ) as keyof typeof navConfig;
  const navItemsi = navConfig[userRole];
  const { fullName, role, isLoggedIn } = useAuth(); // get the user from the store once authed in.
  const logout = useAuthStore((state) => state.logout);
  return (
    <>
      <nav className="w-full px-4 shadow-md bg-viking-900 flex justify-between items-center relative z-30">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <SvgLogo
            className="w-32 h-20"
            textColor="#edfcfe" // viking-50
            circleColor="#48cae4" // viking-400
            arcColor="#ade8f4" // viking-200
          />
        </Link>

        {/* Date Display (Desktop Only) */}
        <div className="hidden sm:flex items-center space-x-2 text-viking-100">
          <FaRegCalendar />
          <p className="text-sm md:text-base">{date}</p>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-3">
          {navItemsi.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={clsx(
                "rounded px-3 py-1 text-sm transition cursor-pointer",
                pathname === path
                  ? "bg-viking-400 text-white font-semibold"
                  : "bg-viking-800 text-viking-100 hover:bg-viking-700"
              )}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn && (
            <section className="flex justify-center items-center space-x-2">
              <RxDividerVertical className="size-6 text-viking-400" />
              <SvgUserplus className="text-viking-100" />
              <p className="text-viking-400 ">
                {fullName} ({role}){" "}
              </p>
              <IoLogOutOutline
                className="size-6 cursor-pointer text-viking-100"
                onClick={() => logout()}
              />
            </section>
          )}
        </div>

        {/* Hamburger for Mobile */}
        <FaBars
          className="sm:hidden text-2xl text-viking-100 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      {/* Overlay and Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-opacity-40 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 w-3/4 sm:hidden h-full bg-viking-950 text-viking-100 p-6 z-30 shadow-lg flex flex-col justify-between">
            {/* Top: Date and Menu */}
            <div>
              <p className="text-sm text-center mb-4 md:text-base text-viking-100">
                {date}
              </p>

              {/* menu header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg text-viking-400 font-bold tracking-wide">
                  Menu
                </h2>
                <FaTimes
                  className="text-2xl text-viking-100 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              {/* nav items */}
              <nav className="flex flex-col space-y-5 text-base">
                {navItemsi.map(({ path, label }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "transition duration-150 pb-1",
                      pathname === path
                        ? "text-viking-50 font-semibold border-b-2 border-viking-400"
                        : "text-viking-200 hover:text-viking-50"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom: User Info & Logout */}
            <div className="border-t border-viking-700 pt-4 mt-6 text-sm text-viking-100">
              <p className="mb-1">{fullName}</p>
              <p className="text-viking-400 font-medium mb-3">{userRole}</p>
              {isLoggedIn && (
                <button
                  onClick={() => logout()}
                  className="bg-viking-400 text-white px-4 py-2 rounded hover:bg-viking-700 transition cursor-pointer"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
