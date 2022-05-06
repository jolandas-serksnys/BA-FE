import React, { useState } from "react";
import { DishGridCell, DishGridContainer } from "./DishGrid.style";
import { Dish } from "../Dish/Dish";
import { DishOrder } from "../DishOrder";
import { Category } from "@src/models/category";
import { useIndexDishes } from "@src/hooks/dish";
import { SectionHeader } from "@src/components/common";

interface Props {
  category: Category;
}

export const DishGrid = ({ category }: Props) => {
  const [dishId, setDishId] = useState<null | number>(null);
  const { data, isLoading, isError } = useIndexDishes(category.id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <SectionHeader title={category.title} />
      <DishGridContainer>
        {data.map((dish) => (
          <DishGridCell key={dish.id}>
            <Dish dish={dish} onClick={() => setDishId(dish.id)} />
          </DishGridCell>
        ))}
        {dishId &&
          <DishOrder
            dishId={dishId}
            categoryId={category.id}
            onClose={() => setDishId(null)}
          />
        }
      </DishGridContainer>
    </>
  )
}