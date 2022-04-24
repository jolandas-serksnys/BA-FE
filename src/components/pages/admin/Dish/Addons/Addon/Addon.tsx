import React, { useState } from "react";
import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { Addon as Model, Dish } from "@src/models/dish";
import { DeleteAddonModal } from "../DeleteAddonModal";
import { EditAddonModal } from "../AddonModal";

interface Props {
  item: Model;
  dish: Dish;
}

export const Addon = ({ item, dish }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Row centered>
        <Column>{item.id}</Column>
        <Column>{item.title}</Column>
        <Column>{item.isOptional ? `Optional` : `Required`}</Column>
        <Column>{item.isMultiple ? `Multichoice` : `Single`}</Column>
        <Column>{item.options?.length || 0}</Column>
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
        <EditAddonModal item={item} dish={dish} onClose={() => setShowEditModal(false)} />
      }
      {showDeleteModal &&
        <DeleteAddonModal item={item} dish={dish} onClose={() => setShowDeleteModal(false)} />
      }
    </>
  );
};