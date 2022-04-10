import { ConfirmModal } from "@src/components/common/ConfirmModal";
import { model, categoriesQueryKey } from "@src/hooks/dish";
import { Dish as Model } from "@src/models/dish";
import { queryClient } from "@src/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  item: Model;
  onClose: () => void;
}

export const DeleteDishModal = ({ item, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ConfirmModal
      title="Delete"
      subTitle="Delete dish"
      onConfirm={async () => {
        try {
          setIsLoading(true);
          await model().delete(item.categoryId, item.id);
          await queryClient.invalidateQueries([categoriesQueryKey, 'category', item.categoryId]);
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