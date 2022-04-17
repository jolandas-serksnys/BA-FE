import { IconAlert, IconFactCheck, IconWidgets } from "@src/components/icons";
import { useAuth } from "@src/contexts/authContext";
import { useTable } from "@src/contexts/tableContext";
import { Employee, EmployeeRole } from "@src/models/employee";
import React from "react";
import { BottomNavItem } from "../BottomNavItem";

export const EmployeeNav = () => {
  const { user } = useAuth();
  const { tableUpdates, setUpdates } = useTable();

  return (
    <>
      <BottomNavItem
        to="/e/orders"
        icon={<IconFactCheck />}
        title={
          <>
            Orders
            {tableUpdates && <span className="status-indicator bg-primary"></span>}
          </>
        }
        onClick={() => { setUpdates() }}
      />
      <BottomNavItem
        to="/e/requests"
        icon={<IconAlert />}
        title="Requests"
      />
      {(user as Employee).role === EmployeeRole.ADMINISTRATOR &&
        <>
          <BottomNavItem to="/e/admin" icon={<IconWidgets />} title="Admin" />
        </>
      }
    </>
  );
};