import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { model, tablesQueryKey } from "@src/hooks/table";
import { Table as Model } from "@src/models/table";
import { queryClient } from "@src/utils";
import React, { useState } from "react";
import { Badge } from "react-bootstrap";
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
          {item.isAvailable ? <Badge bg="success">Available</Badge> : <Badge bg="gray" text="dark">Not available</Badge>}
        </Column>
        <Column>
          <div className="d-flex justify-content-end gap-2">
            <Button size="xs" outline borderless variant="primary" className="px-2 text-nowrap" onClick={toggleAvailability} isLoading={isLoading} disabled={isLoading}>
              {item.isAvailable ? 'Disable' : 'Enable'}
            </Button>
            <Button size="xs" outline borderless variant="primary" onClick={() => setShowEditModal(true)}><IconEdit /></Button>
            <Button size="xs" outline borderless variant="danger" onClick={() => setShowDeleteModal(true)}><IconDelete /></Button>
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