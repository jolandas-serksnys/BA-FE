import { model, categoriesQueryKey } from "@src/hooks/category";
import { Category } from "@src/models/category";
import { queryClient } from "@src/utils";
import React from "react"
import toast from "react-hot-toast";
import { CategoryModal } from "./CategoryModal"

interface Props {
  onClose: () => void;
}

export const CreateCategoryModal = ({ onClose }: Props) => {
  const initialValues = {
    title: 'New category',
    description: '',
    isVisible: true,
  } as Category;

  return (
    <CategoryModal
      title="New Category"
      subTitle="Add a new category"
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={async (values: any) => {
        try {
          await model().create(values);
          await queryClient.invalidateQueries(categoriesQueryKey);
          onClose();
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
    />
  )
}