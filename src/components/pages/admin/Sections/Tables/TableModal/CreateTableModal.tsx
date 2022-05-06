import { model, tablesQueryKey } from "@src/hooks/table";
import { TableRequest } from "@src/models/table"
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { TableModal } from "./TableModal"

interface Props {
  onClose: () => void;
}

export const CreateTableModal = ({ onClose }: Props) => {
  const initialValues = {
    displayName: 'Table name',
    number: 1000,
    useId: true,
    isAvailable: true,
    seats: 1,
  } as TableRequest;

  return (
    <TableModal
      title="New Table"
      subTitle="Add a new table"
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={async (values) => {
        try {
          await model().create(values);
          await queryClient.invalidateQueries(tablesQueryKey);
          onClose();
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
    />
  )
}