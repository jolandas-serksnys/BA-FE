import { ConfirmModal } from "@src/components/common/ConfirmModal";
import { employeesQueryKey, model } from "@src/hooks/employee";
import { Employee as Model } from "@src/models/employee";
import { queryClient } from "@src/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  item: Model;
  onClose: () => void;
}

export const DeleteEmployeeModal = ({ item, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ConfirmModal
      title="Delete"
      subTitle="Delete employee"
      onConfirm={async () => {
        try {
          setIsLoading(true);
          await model().delete(item.id);
          await queryClient.invalidateQueries(employeesQueryKey);
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
      Are you sure you want to delete <strong>{`${item.firstName} ${item.lastName}`}</strong>? This action cannot be undone.
    </ConfirmModal>
  );
};