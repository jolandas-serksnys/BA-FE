import React, { useState } from "react";
import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { Dish as Model } from "@src/models/dish";
import { Badge } from "react-bootstrap";
import { queryClient } from "@src/utils";
import { categoriesQueryKey, model } from "@src/hooks/dish";
import { EditDishModal } from "../DishModal";

export const Dish = (item: Model) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleAvailability = async () => {
    setIsLoading(true);
    await model().toggleAvailability(item.categoryId, item.id);
    queryClient.invalidateQueries(categoriesQueryKey);
    setIsLoading(false);
  }

  const toggleVisibility = async () => {
    setIsLoading(true);
    await model().toggleVisibility(item.categoryId, item.id);
    queryClient.invalidateQueries(categoriesQueryKey);
    setIsLoading(false);
  }

  return (
    <>
      <Row centered>
        <Column>{item.id}</Column>
        <Column>{item.title}</Column>
        <Column>
          {item.ageRestriction ? <Badge bg="warning">{item.ageRestriction}</Badge> : <Badge bg="gray" className="text-dark">N/A</Badge>}
        </Column>
        <Column>{item.basePrice} &euro;</Column>
        <Column>
          <div className="d-flex gap-2">
            {item.isAvailable ? <Badge bg="success">Available</Badge> : <Badge bg="gray" text="dark">Not available</Badge>}
            {item.isVisible ? <Badge bg="success">Visible</Badge> : <Badge bg="gray" text="dark">Hidden</Badge>}
          </div>
        </Column>
        <Column>
          <div className="d-flex justify-content-end gap-2">
            <Button
              size="xs"
              outline
              borderless
              variant="primary"
              className="px-2 text-nowrap"
              onClick={toggleAvailability}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {item.isAvailable ? 'Disable' : 'Enable'}
            </Button>
            <Button
              size="xs"
              outline
              borderless
              variant="primary"
              className="px-2 text-nowrap"
              onClick={toggleVisibility}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {item.isVisible ? 'Hide' : 'Show'}
            </Button>
            <Button
              size="xs"
              outline
              borderless
              variant="primary"
              onClick={() => setShowEditModal(true)}
            >
              <IconEdit />
            </Button>
            <Button size="xs" outline borderless variant="danger"><IconDelete /></Button>
          </div>
        </Column>
      </Row>
      {showEditModal &&
        <EditDishModal item={item} categoryId={item.categoryId} onClose={() => setShowEditModal(false)} />
      }
    </>
  );
};