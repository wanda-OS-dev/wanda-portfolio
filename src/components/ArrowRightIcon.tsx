import * as React from 'react';

export function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        d="M1 7h12M8 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
