import React from 'react';

const SvgGithub = (props: React.SVGProps<SVGSVGElement>) => (
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
    className="lucide lucide-github"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3-1 3-4 3-5.5.08-1.2-.27-2.4-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.73 1.15-.28 2.35 0 3.5-.73 1.1-1.08 2.3-1 3.5 0 1.5 0 4.5 3 5.5-1 .5-1.5 1.2-1.5 3.5v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export { SvgGithub };
