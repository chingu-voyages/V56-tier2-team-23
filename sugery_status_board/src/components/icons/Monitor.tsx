import * as React from "react";
import type { SVGProps } from "react";
const SvgMonitor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="monitor_svg__lucide monitor_svg__lucide-monitor-icon monitor_svg__lucide-monitor"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={20} height={14} x={2} y={3} rx={2} />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
SvgMonitor.displayName = "SvgMonitor";
export { SvgMonitor };
