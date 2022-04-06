import clsx from "clsx";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Li } from "./BottomNavItem.style";

interface Props {
  to: string;
  icon: JSX.Element;
  title: string | JSX.Element;
  onClick?: () => void;
}

export const BottomNavItem = ({ to, icon, title, onClick }: Props) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Li>
      <Link to={to} onClick={onClick} className={clsx('rounded', 'd-flex', 'gap-3', 'align-items-center', 'justify-content-center', 'text-decoration-none', 'p-3', { 'bg-gray text-black': match }, { 'text-gray': !match })}>
        <span>{icon}</span>
        <strong>{title}</strong>
      </Link>
    </Li>
  )
};