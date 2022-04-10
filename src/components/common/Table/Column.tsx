import clsx from "clsx";
import React from "react";

export const Column = ({ children, className, ...rest }: React.TdHTMLAttributes<HTMLTableDataCellElement>) =>
(
  <td className={clsx('delish-table-column', className)} {...rest}>
    {children}
  </td>
);