import React from "react";
import { Layout } from "@src/components/common/Layout/Layout";
import { Dishes } from "./Dishes";
import { useGetCategory } from "@src/hooks/category";
import { useParams } from "react-router-dom";
import { useIndexDishesEmployee } from "@src/hooks/dish";

export const DishesPage = () => {
  const { id } = useParams();

  const { data: category, isLoading, error: categoryError } = useGetCategory(Number(id));
  const { data: dishes, isLoading: dishesIsLoading, error: dishesError } = useIndexDishesEmployee(Number(id));

  if (isLoading || dishesIsLoading) {
    return <div>Loading...</div>;
  }

  if (!category || categoryError || dishesError) {
    return <div>Error has occured</div>;
  }

  return (
    <Layout>
      <Dishes category={category} dishes={dishes} />
    </Layout>
  )
};