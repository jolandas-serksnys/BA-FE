import { useAuth } from "@src/contexts/authContext";
import React from "react"
import { Navigate } from "react-router-dom"

export const EmployeeGuard = (props: any) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>Loading...</>
    )
  }

  if (!isLoading && (!user || !user.isEmployee)) {
    return (
      <Navigate to="/e/sign-in" replace />
    );
  }

  return props.children;
};