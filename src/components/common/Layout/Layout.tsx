import clsx from "clsx";
import React from "react";
import { BottomNav } from "../BottomNav";
import { NavBar } from "../NavBar";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  noHeader?: boolean;
  noFooter?: boolean;
  noContainerClass?: boolean;
}

export const Layout = ({ noHeader, noContainerClass, noFooter, ...props }: Props) => (
  <>
    {!noHeader ? <NavBar /> : <div></div>}
    <div {...props} className={clsx(!noContainerClass ? 'container' : '', props.className)}>
      {props.children}
    </div>
    {!noFooter && <BottomNav />}
  </>
);