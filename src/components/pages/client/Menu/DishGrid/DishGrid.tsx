import React, { useState } from "react";
import { DishGridCell, DishGridContainer } from "./DishGrid.style";
import { Dish } from "../Dish/Dish";
import { DishOrder } from "../DishOrder";
import { Category } from "@src/models/category";

interface Props {
  category: Category;
}

export const DishGrid = ({ category }: Props) => {
  const [dishId, setDishId] = useState<null | number>(null);

  return (
    <DishGridContainer>
      {category.dishes.map((dish) => (
        <DishGridCell key={dish.id}>
          <Dish dish={dish} onClick={() => setDishId(dish.id)} />
        </DishGridCell>
      ))}
      {dishId && <DishOrder dishId={dishId} categoryId={category.id} onClose={() => setDishId(null)} />}
    </DishGridContainer>
  )
}