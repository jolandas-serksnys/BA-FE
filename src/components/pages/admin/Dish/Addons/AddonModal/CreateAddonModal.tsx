import { model, categoriesQueryKey } from "@src/hooks/dish";
import { Addon, Dish, Option } from "@src/models/dish";
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { AddonModal } from "./AddonModal"

interface Props {
  onClose: () => void;
  dish: Dish;
}

export const CreateAddonModal = ({ onClose, dish }: Props) => {
  const initialValues = {
    title: 'New Dish Addon',
    isOptional: true,
    isMultiple: true,
    options: [] as Option[]
  } as Addon;

  return (
    <AddonModal
      title="New Dish Addon"
      subTitle="Add a new dish addon"
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={async (values) => {
        try {
          await model().createAddon(dish.categoryId, dish.id, values);
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