import { useGetDish } from '@src/hooks/dish';
import React from 'react';
import { DishOrder as Modal } from './DishOrder';

interface Props {
  dishId: number;
  categoryId: number;
  onClose: () => void
}

export const DishOrder = ({ dishId, categoryId, onClose }: Props) => {
  const { data, isLoading, error } = useGetDish(categoryId, dishId);

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Error!</div>;

  return <Modal dish={data} onClose={onClose} />;
}