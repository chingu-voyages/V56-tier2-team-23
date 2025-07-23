import * as React from "react";
import type { SVGProps } from "react";
const SvgUserplus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="userplus_svg__lucide userplus_svg__lucide-user-plus-icon userplus_svg__lucide-user-plus"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx={9} cy={7} r={4} />
    <path d="M19 8v6M22 11h-6" />
  </svg>
);
SvgUserplus.displayName = "SvgUserplus";
export { SvgUserplus };
