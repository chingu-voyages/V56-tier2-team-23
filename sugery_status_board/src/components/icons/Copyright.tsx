import React from 'react';

const SvgCopyright = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-copyright"
    {...props}
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M14.5 9a3.5 3.5 0 1 0 0 6h1"/>
  </svg>
);

export { SvgCopyright };
