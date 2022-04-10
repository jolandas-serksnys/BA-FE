import { model, categoriesQueryKey } from "@src/hooks/dish";
import { Dish as Model } from "@src/models/dish";
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { DishModal } from "./DishModal"

interface Props {
  item: Model;
  onClose: () => void;
}

export const EditDishModal = ({ item, onClose }: Props) => {
  const initialValues = item as Model;

  return (
    <DishModal
      title="Edit Dish"
      subTitle="Edit selected dish"
      initialValues={initialValues}
      onClose={onClose}
      isLoading={false}
      onSubmit={async (values, helpers) => {
        try {
          await model().update(item.id, values);
          await queryClient.invalidateQueries([categoriesQueryKey, 'category', item.categoryId]);
          onClose();
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
    />
  )
}