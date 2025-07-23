import * as React from "react";
import type { SVGProps } from "react";
const SvgCopyright = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="copyright_svg__lucide copyright_svg__lucide-copyright-icon copyright_svg__lucide-copyright"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
  </svg>
);
SvgCopyright.displayName = "SvgCopyright";
export { SvgCopyright };
