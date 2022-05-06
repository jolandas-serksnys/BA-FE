import { model, categoriesQueryKey } from "@src/hooks/dish";
import { Dish } from "@src/models/dish";
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { DishModal } from "./DishModal"

interface Props {
  onClose: () => void;
  categoryId: number;
}

export const CreateDishModal = ({ onClose, categoryId }: Props) => {
  const initialValues = {
    title: 'New Dish',
    description: '',
    warningLabel: '',
    isVisible: true,
    isAvailable: true,
    imageUrl: '',
    categoryId: categoryId,
    basePrice: 0.0,
    addons: [],
    tags: []
  } as Dish;

  return (
    <DishModal
      title="New Dish"
      subTitle="Add a new dish"
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={async (values) => {
        try {
          await model().create(categoryId, values);
          await queryClient.invalidateQueries([categoriesQueryKey, 'category', categoryId]);
          onClose();
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
    />
  )
}