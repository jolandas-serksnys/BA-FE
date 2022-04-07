import clsx from "clsx";
import React from "react";
import { TestableComponentProps } from "../TestableComponent";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, TestableComponentProps {
  header?: string | JSX.Element;
  body?: string | JSX.Element;
  noBodyClass?: boolean;
  footer?: string | JSX.Element;
}

export const Card = ({ header, body, noBodyClass, footer, ...otherProps }: Props) => {
  return (
    <div {...otherProps} className={clsx('card', otherProps.className)}>
      {header &&
        <div className="card-header">
          <strong className="section-heading">{header}</strong>
        </div>
      }
      {body &&
        <div className={clsx({ 'card-body': !noBodyClass })}>
          {body}
        </div>
      }
      {footer &&
        <div className="card-footer">
          {footer}
        </div>
      }
    </div>
  )
}