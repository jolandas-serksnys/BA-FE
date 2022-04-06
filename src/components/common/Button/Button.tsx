import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";
import { Spinner } from "../Spinner/Spinner";
import { TestableComponentProps } from "../TestableComponent";

interface Props extends TestableComponentProps, DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'gray' | 'link';
  size?: 'xs' | 'sm' | 'lg';
  outline?: boolean;
  isLoading?: boolean;
  square?: boolean;
  borderless?: boolean;
}

export const Button = ({ isLoading, variant, size, outline, borderless, square = false, ...otherProps }: Props) => {
  return (
    <button
      {...otherProps}
      className={clsx('btn', { 'btn-square': square }, { [`btn-${size}`]: size }, `btn${outline ? '-outline' : ''}-${variant ? variant : 'dark'}`, { [`btn-borderless`]: borderless }, { 'btn-loading': isLoading }, otherProps.className)}
    >
      {isLoading &&
        <span className="btn-spinner">
          <Spinner />
        </span>
      }
      <span className="btn-content">
        {otherProps.children}
      </span>
    </button>
  );
};