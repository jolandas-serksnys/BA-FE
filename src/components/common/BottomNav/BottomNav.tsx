import { useAuth } from "@src/contexts/authContext";
import React from "react";
import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";

export const BottomNav = () => {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  return (
    <nav className="navbar py-0 pb-3 sticky-bottom">
      <nav className="container">
        <div className="card w-100">
          <ul className="nav p-2 gap-2 w-100">
            {user.isEmployee && <EmployeeNav />}
            {!user.isEmployee && <CustomerNav />}
          </ul>
        </div>
      </nav>
    </nav>
  );
};