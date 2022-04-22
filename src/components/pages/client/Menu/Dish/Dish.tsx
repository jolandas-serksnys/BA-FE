import React from "react";

import { Dish as Model } from "@src/models/dish"
import { WarningLabel, DishContainer, DishImage, Info } from './Dish.style';
import { Badge } from "react-bootstrap";

interface Props {
  dish: Model;
  onClick?: any;
}

export const Dish = ({ dish, onClick }: Props) => {
  const handleOnClick = () => {
    if (onClick && dish.isAvailable) {
      onClick(dish);
    }
  };

  return (
    <DishContainer onClick={handleOnClick} className="shadow-sm">
      <DishImage src={dish.imageUrl} />
      {dish.warningLabel &&
        <WarningLabel>
          <h5>
            <Badge>
              {dish.warningLabel}
            </Badge>
          </h5>
        </WarningLabel>
      }
      <Info className="card">
        <div className="card-body p-4 d-flex flex-column gap-2">
          <div className="d-flex gap-2 justify-content-between">
            <h5 className="section-heading m-0">{dish.title}</h5>
            <h5 className="text-primary fw-bold text-nowrap m-0">{dish.basePrice == 0.00 ? 'Free' : <>{dish.basePrice} &euro;</>}</h5>
          </div>
          {((dish.tags && dish.tags.length > 0) || !dish.isAvailable) &&
            <div>
              {!dish.isAvailable && <div className="badge bg-warning d-inline-block me-1">Currently unavailable</div>}
              {dish.tags.map((tag) => (
                <div key={tag.id} className="badge bg-gray text-dark d-inline-block me-1">{tag.title}</div>
              ))}
            </div>
          }
        </div>
      </Info>
    </DishContainer>
  );
};