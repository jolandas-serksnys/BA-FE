import { css } from "@emotion/css";
import clsx from "clsx";
import React from "react"
import { Column } from "./Column";

interface Props {
  headers: {
    title: string;
    style?: any;
    width?: string;
  }[],
  rows?: JSX.Element[]
}

export const Table = ({ headers, rows }: Props) => {
  const columns = headers.map((header) => header.width ? header.width : '1fr').join(' ');

  return (
    <div className={clsx('delish-table-container')}>
      <table className={clsx('delish-table', css`--columns: ${columns};`)}>
        <thead className='delish-table-header'>
          <tr>
            {headers.map((header) => (
              <Column key={header.title} style={header.style}>{header.title}</Column>
            ))}
          </tr>
        </thead>
        <tbody className="delish-table-body">
          {rows}
        </tbody>
      </table>
    </div>
  );
}