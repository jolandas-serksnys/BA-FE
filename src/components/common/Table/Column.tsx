import clsx from "clsx";
import React from "react";

export const Column = ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) =>
(
  <td className={clsx('delish-table-column', className)} {...rest}>
    {children}
  </td>
);