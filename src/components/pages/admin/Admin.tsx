import React from "react";
import { Layout } from "@src/components/common/Layout/Layout";
import { Statistics, Tables, Categories, Employees, Establishment } from "./Sections";

export const AdminPage = () => (
  <Layout>
    <Statistics />
    <Tables />
    <Categories />
    <Employees />
    <Establishment />
  </Layout>
);