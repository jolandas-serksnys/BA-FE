import { ConfirmModal } from "@src/components/common/ConfirmModal";
import { model, tablesQueryKey, useGetTables } from "@src/hooks/table";
import { Table as Model } from "@src/models/table";
import { queryClient } from "@src/utils";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  item: Model;
  onClose: () => void;
}

export const DeleteTableModal = ({ item, onClose }: Props) => {
  const { isLoading } = useGetTables();

  return (
    <ConfirmModal
      title="Delete"
      subTitle="Delete table"
      onConfirm={async () => {
        try {
          await model().delete(item.id);
          await queryClient.invalidateQueries(tablesQueryKey);
          onClose();
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
      onClose={onClose}
      isLoading={isLoading}
    >
      Are you sure you want to delete <strong>{item.displayName}</strong>? This action cannot be undone.
    </ConfirmModal>
  );
};