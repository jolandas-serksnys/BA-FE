import { ConfirmModal } from "@src/components/common/ConfirmModal";
import { model, categoriesQueryKey } from "@src/hooks/dish";
import { Addon as Model, Dish } from "@src/models/dish";
import { queryClient } from "@src/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  item: Model;
  dish: Dish;
  onClose: () => void;
}

export const DeleteAddonModal = ({ item, dish, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ConfirmModal
      title="Delete"
      subTitle="Delete dish addon"
      onConfirm={async () => {
        try {
          setIsLoading(true);
          await model().deleteAddon(dish.categoryId, dish.id, item.id);
          await queryClient.invalidateQueries([categoriesQueryKey, 'category', dish.categoryId, 'dish', dish.id, 'addons']);
          setIsLoading(false);
          onClose();
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
      onClose={onClose}
      isLoading={isLoading}
    >
      Are you sure you want to delete <strong>{item.title}</strong>? This action cannot be undone.
    </ConfirmModal>
  );
};