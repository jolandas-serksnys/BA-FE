import { model, categoriesQueryKey } from "@src/hooks/dish";
import { Addon as Model, Dish } from "@src/models/dish";
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { AddonModal } from "./AddonModal"

interface Props {
  item: Model;
  dish: Dish;
  onClose: () => void;
}

export const EditAddonModal = ({ item, dish, onClose }: Props) => {
  const initialValues = item as Model;

  return (
    <AddonModal
      title="Edit Dish Addon"
      subTitle="Edit selected dish addon"
      initialValues={initialValues}
      onClose={onClose}
      isLoading={false}
      onSubmit={async (values, helpers) => {
        try {
          await model().updateAddon(dish.categoryId, dish.id, item.id, values);
          await queryClient.invalidateQueries([categoriesQueryKey, 'category', dish.categoryId, 'dish', dish.id, 'addons']);
          onClose();
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
    />
  )
}