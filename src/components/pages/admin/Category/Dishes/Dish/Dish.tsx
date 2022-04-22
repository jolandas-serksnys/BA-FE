import React, { useState } from "react";
import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { Dish as Model } from "@src/models/dish";
import { Badge, Dropdown } from "react-bootstrap";
import { queryClient } from "@src/utils";
import { categoriesQueryKey, model } from "@src/hooks/dish";
import { EditDishModal } from "../DishModal";
import { DeleteDishModal } from "../DeleteDishModal";

export const Dish = (item: Model) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
          {item.warningLabel
            ? <Badge bg="primary">{item.warningLabel}</Badge>
            : <Badge bg="gray" className="text-dark">N/A</Badge>
          }
        </Column>
        <Column>
          <Dropdown>
            <Dropdown.Toggle variant={item.isVisible ? 'success text-light' : 'gray'} id="availability-dropdown" className="p-0 px-2 rounded-xs border-0" >
              {item.isVisible ? 'Visible' : 'Hidden'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleVisibility}>
                {item.isVisible ? 'Hidden' : 'Visible'}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Column>
        <Column>
          <Dropdown>
            <Dropdown.Toggle variant={item.isAvailable ? 'success text-light' : 'gray'} id="availability-dropdown" className="p-0 px-2 rounded-xs border-0" >
              {item.isAvailable ? 'Available' : 'Unavailable'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleAvailability}>
                {item.isAvailable ? 'Unavailable' : 'Available'}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Column>
        <Column className="text-nowrap text-end">
          {item.basePrice} &euro;
        </Column>
        <Column>
          <div className="d-flex justify-content-end gap-2">
            <Button
              size="xs"
              outline
              borderless
              variant="primary"
              onClick={() => setShowEditModal(true)}
            >
              <IconEdit />
            </Button>
            <Button
              size="xs"
              outline
              borderless
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <IconDelete />
            </Button>
          </div>
        </Column>
      </Row>
      {showEditModal &&
        <EditDishModal item={item} onClose={() => setShowEditModal(false)} />
      }
      {showDeleteModal &&
        <DeleteDishModal item={item} onClose={() => setShowDeleteModal(false)} />
      }
    </>
  );
};