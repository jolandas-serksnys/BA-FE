import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { useAuth } from "@src/contexts/authContext";
import { Employee as Model } from "@src/models/employee";
import { capitalize } from "@src/utils";
import React, { useState } from "react";
import { DeleteEmployeeModal } from "../DeleteEmployeeModal";

interface Props {
  item: Model;
}

export const Employee = ({ item }: Props) => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Row centered>
        <Column>{item.id}</Column>
        <Column>
          {`${item.firstName} ${item.lastName}`}
        </Column>
        <Column>{capitalize(item.role)}</Column>
        <Column>
          <div className="d-flex justify-content-end gap-2">
            <Button size="xs" outline borderless variant="primary" onClick={() => setShowEditModal(true)}><IconEdit /></Button>
            <Button size="xs" outline borderless variant="danger" onClick={() => setShowDeleteModal(true)} disabled={user.id === item.id}><IconDelete /></Button>
          </div>
        </Column>
      </Row>
      {showEditModal &&
        <></>
      }
      {showDeleteModal &&
        <DeleteEmployeeModal item={item} onClose={() => setShowDeleteModal(false)} />
      }
    </>
  );
};