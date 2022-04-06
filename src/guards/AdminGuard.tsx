import { useAuth } from "@src/contexts/authContext";
import { Employee, EmployeeRole } from "@src/models/employee";
import React from "react"
import { Navigate } from "react-router-dom"

export const AdminGuard = (props: any) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>Loading...</>
    )
  }

  if (!isLoading && (!user || !user.isEmployee || (user as Employee).role !== EmployeeRole.ADMINISTRATOR)) {
    return (
      <Navigate to="/e/sign-in" replace />
    );
  }

  return props.children;
};