import React from 'react';

const SvgMapPin = (props: React.SVGProps<SVGSVGElement>) => (
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
    className="lucide lucide-map-pin"
    {...props}
  >
    <path d="M12 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/>
    <path d="M12 22.5c-4.97 0-9-4.03-9-9a9 9 0 0 1 18 0c0 4.97-4.03 9-9 9Z"/>
  </svg>
);

export { SvgMapPin };
