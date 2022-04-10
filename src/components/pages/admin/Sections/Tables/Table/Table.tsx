import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { model, tablesQueryKey } from "@src/hooks/table";
import { Table as Model } from "@src/models/table";
import { queryClient } from "@src/utils";
import React, { useState } from "react";
import { Badge, Dropdown, DropdownButton } from "react-bootstrap";
import { DeleteTableModal } from "../DeleteTableModal";
import { EditTableModal } from "../TableModal/EditTableModal";

export const Table = (item: Model) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAvailability = async () => {
    setIsLoading(true);
    await model().toggleAvailability(item.id);
    queryClient.invalidateQueries(tablesQueryKey);
    setIsLoading(false);
  }

  return (
    <>
      <Row centered>
        <Column>{item.id}</Column>
        <Column>{item.number}</Column>
        <Column>{item.displayName}</Column>
        <Column>{item.seats}</Column>
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
        <EditTableModal item={item} onClose={() => setShowEditModal(false)} />
      }
      {showDeleteModal &&
        <DeleteTableModal item={item} onClose={() => setShowDeleteModal(false)} />
      }
    </>
  );
};