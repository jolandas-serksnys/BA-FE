import React from "react";
import { Layout } from "@src/components/common/Layout/Layout";
import { Addons } from "./Addons";
import { useParams } from "react-router-dom";
import { useGetDish, useIndexAddons } from "@src/hooks/dish";

export const AddonsPage = () => {
  const { categoryId, id } = useParams();

  const { data: dish, isLoading, error: dishError } = useGetDish(Number(categoryId), Number(id));
  const { data: addons, isLoading: addonsIsLoading, error: addonsError } = useIndexAddons(Number(categoryId), Number(id));

  if (isLoading || addonsIsLoading) {
    return <div>Loading...</div>;
  }

  if (!dish || dishError || addonsError) {
    return <div>Error has occured</div>;
  }

  return (
    <Layout>
      <Addons dish={dish} addons={addons} />
    </Layout>
  )
};