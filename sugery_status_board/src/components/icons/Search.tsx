import * as React from "react";
import type { SVGProps } from "react";
const SvgSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="search_svg__lucide search_svg__lucide-search-icon search_svg__lucide-search"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m21 21-4.34-4.34" />
    <circle cx={11} cy={11} r={8} />
  </svg>
);
SvgSearch.displayName = "SvgSearch";
export { SvgSearch };
