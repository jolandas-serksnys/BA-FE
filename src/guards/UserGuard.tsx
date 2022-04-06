import { useAuth } from "@src/contexts/authContext";
import React from "react"
import { Navigate, } from "react-router-dom"

export const UserGuard = (props: any) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>Loading...</>
    )
  }

  if (!isLoading && !user) {
    return (
      <Navigate to="/" replace />
    );
  }

  return props.children;
};