import { useAuth } from "@src/contexts/authContext";
import React from "react"
import { Navigate, } from "react-router-dom"

export const GuestGuard = (props: any) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>Loading...</>
    )
  }

  if (user.isEmployee) {
    return (
      <Navigate to="/e" replace />
    );
  }

  if (user.isEmployee) {
    return (
      <Navigate to="/" replace />
    );
  }

  return props.children;
};