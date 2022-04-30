import React from "react";
import { Layout } from "@src/components/common/Layout/Layout";
import { Tables, Categories, Employees, Establishment } from "./Sections";

export const AdminPage = () => (
  <Layout>
    <Establishment />
    {/* <Statistics /> */}
    <Tables />
    <Categories />
    <Employees />
  </Layout>
);