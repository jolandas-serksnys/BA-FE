import { IconFastFood, IconFactCheck, IconReceipt } from "@src/components/icons";
import { useTable } from "@src/contexts/tableContext";
import React from "react";
import { BottomNavItem } from "../BottomNavItem";

export const CustomerNav = () => {
  const { tableUpdates, setUpdates } = useTable();

  return (
    <>
      <BottomNavItem to="/menu" icon={<IconFastFood />} title="Menu" />
      <BottomNavItem
        to="/orders"
        icon={<IconFactCheck />}
        title={
          <>
            Table &amp; Orders
            {tableUpdates && <span className="status-indicator bg-primary"></span>}
          </>
        }
        onClick={() => { setUpdates() }}
      />
      <BottomNavItem to="/bill" icon={<IconReceipt />} title="Bill" />
    </>
  );
};