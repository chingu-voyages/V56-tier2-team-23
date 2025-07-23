import * as React from "react";
import type { SVGProps } from "react";
const SvgClipboard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="clipboard_svg__lucide clipboard_svg__lucide-clipboard-plus-icon clipboard_svg__lucide-clipboard-plus"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14h6M12 17v-6" />
  </svg>
);
SvgClipboard.displayName = "SvgClipboard";
export { SvgClipboard };
