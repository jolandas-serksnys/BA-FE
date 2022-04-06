import React from "react";

interface Props {
  title: string | JSX.Element;
  subTitle?: string | JSX.Element;
}

export const CardTitle = ({ title, subTitle }: Props) => (
  <div className="text-center mt-3">
    <strong>{title}</strong>
    {subTitle && <small className="text-muted d-block">{subTitle}</small>}
  </div>
);