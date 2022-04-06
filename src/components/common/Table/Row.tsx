import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  centered?: boolean
}


export const Row = ({ children, className, centered, ...rest }: Props) =>
(
  <tr className={clsx('delish-table-row', { 'align-items-center': centered }, className)} {...rest}>
    {children}
  </tr>
);