import React, { ReactElement, SVGProps } from "react";

export const IconSettings = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="icon" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" />
  </svg>
);