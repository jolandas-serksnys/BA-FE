import { Layout } from "@src/components/common/Layout";
import { useAuth } from "@src/contexts/authContext";
import { Employee } from "@src/models/employee"
import React from "react";

export const EmployeePage = () => {
  const { user } = useAuth();
  const employee = user as Employee;

  return (
    <>
      {employee &&
        <Layout>
          Hi, {employee.firstName} {employee.lastName}
        </Layout>
      }
    </>
  )
};