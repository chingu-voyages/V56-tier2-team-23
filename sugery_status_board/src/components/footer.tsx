import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { BsDot } from "react-icons/bs";

export default function Footer() {
  const developers = [
    { name: "Shamuran", git: "https://github.com/Ahmad-nba" },
    { name: "Shubham", git: "https://github.com/1" },
    { name: "Anthony", git: "https://github.com/" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-accentSub brightness-75 shadow  text-gray-800 px-4 py-4 text-sm md:text-base flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
      {/* GitHub Link */}
      <Link
        href="/"
        className="flex items-center space-x-2 hover:underline transition"
      >
        <FiGithub className="text-lg" />
        <span>View on GitHub</span>
      </Link>

      {/* Developer Team */}
      <div className="flex items-center space-x-3 flex-wrap justify-center">
        <span className="flex items-center space-x-1">
          <LuUsers className="text-lg" />
          <span>Development Team:</span>
        </span>
        <span className="flex items-center space-x-1 flex-wrap">
          {developers.map((dev, i) => (
            <span key={dev.git} className="flex items-center space-x-1">
              <Link
                href={dev.git}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {dev.name}
              </Link>
              {i < developers.length - 1 && (
                <BsDot className="text-lg stroke-2 text-gray-400" />
              )}
            </span>
          ))}
        </span>
      </div>

      {/* Copyright */}
      <div className="text-xs sm:text-sm text-gray-800">
        &copy; {year} Surgery Status Board. All rights reserved.
      </div>
    </footer>
  );
}
