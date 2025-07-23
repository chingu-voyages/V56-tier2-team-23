import * as React from "react";
import type { SVGProps } from "react";
const SvgCancel = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="cancel_svg__lucide cancel_svg__lucide-x-icon cancel_svg__lucide-x"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
SvgCancel.displayName = "SvgCancel";
export { SvgCancel };
