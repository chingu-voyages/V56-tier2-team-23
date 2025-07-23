import * as React from "react";
import type { SVGProps } from "react";
const SvgActivity = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="activity_svg__lucide activity_svg__lucide-activity-icon activity_svg__lucide-activity"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
  </svg>
);
SvgActivity.displayName = "SvgActivity";
export { SvgActivity };
