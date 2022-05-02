import { ConfirmModal } from "@src/components/common/ConfirmModal";
import { categoriesQueryKey, model, useGetCategories } from "@src/hooks/category";
import { Category as Model } from "@src/models/category";
import { queryClient } from "@src/utils";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  item: Model;
  onClose: () => void;
}

export const DeleteTableModal = ({ item, onClose }: Props) => {
  const { isLoading } = useGetCategories();

  return (
    <ConfirmModal
      title="Delete"
      subTitle="Delete category"
      onConfirm={async () => {
        try {
          await model().delete(item.id);
          await queryClient.invalidateQueries(categoriesQueryKey);
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