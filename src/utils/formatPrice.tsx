import React from "react";

export const formatPrice = (oldPrice: string | number) => {
  const price = typeof oldPrice == 'string' ? parseFloat(oldPrice) : oldPrice;

  if (price == 0) {
    return <>Free</>;
  }

  return (
    <>{price.toFixed(2)} &euro;</>
  );
};