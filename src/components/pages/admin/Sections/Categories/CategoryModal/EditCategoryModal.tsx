import { model, categoriesQueryKey } from "@src/hooks/category";
import { Category as Model } from "@src/models/category";
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { CategoryModal } from "./CategoryModal"

interface Props {
  item: Model;
  onClose: () => void;
}

export const EditCategoryModal = ({ item, onClose }: Props) => (
  <CategoryModal
    title="Edit Table"
    subTitle="Edit selected table"
    initialValues={item}
    onClose={onClose}
    isLoading={false}
    onSubmit={async (values, helpers) => {
      try {
        await model().update(item.id, values);
        await queryClient.invalidateQueries(categoriesQueryKey);
        onClose();
      } catch (error) {
        toast.error('Something went wrong trying to perform this action.');
        console.log(error);
      }
    }}
  />
);