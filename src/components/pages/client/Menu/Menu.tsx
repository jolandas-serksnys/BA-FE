import { SectionHeader } from "@src/components/common";
import { Layout } from "@src/components/common/Layout/Layout";
import { useGetCategories } from "@src/hooks/category";
import { Category } from "@src/models/category";
import React, { Fragment } from "react";
import { DishGrid } from "./DishGrid";

export const MenuPage = () => {
  const { data } = useGetCategories();

  return (
    <Layout>
      {data && data.map((category: Category) => (
        <Fragment key={category.id}>
          <SectionHeader title={category.title} />
          <DishGrid category={category} />
        </Fragment>
      ))}
    </Layout>
  );
};