import { model, tablesQueryKey } from "@src/hooks/table";
import { Table as Model, TableRequest } from "@src/models/table"
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { TableModal } from "./TableModal"

interface Props {
  item: Model;
  onClose: () => void;
}

export const EditTableModal = ({ item, onClose }: Props) => {

  const initialValues = item as TableRequest;

  return (
    <TableModal
      title="Edit Table"
      subTitle="Edit selected table"
      initialValues={initialValues}
      onClose={onClose}
      isLoading={false}
      onSubmit={async (values, helpers) => {
        try {
          await model().update(item.id, values);
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