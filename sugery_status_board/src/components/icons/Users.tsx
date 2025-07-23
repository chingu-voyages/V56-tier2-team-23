import * as React from "react";
import type { SVGProps } from "react";
const SvgUsers = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="users_svg__lucide users_svg__lucide-users-icon users_svg__lucide-users"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" />
    <circle cx={9} cy={7} r={4} />
  </svg>
);
SvgUsers.displayName = "SvgUsers";
export { SvgUsers };
