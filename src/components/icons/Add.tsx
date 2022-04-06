import React, { ReactElement, SVGProps } from "react";

export const IconAdd = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
);