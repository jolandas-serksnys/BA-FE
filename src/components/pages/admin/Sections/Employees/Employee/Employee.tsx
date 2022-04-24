import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { useAuth } from "@src/contexts/authContext";
import { Employee as Model } from "@src/models/employee";
import { capitalize } from "@src/utils";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { DeleteEmployeeModal } from "../DeleteEmployeeModal";
import { EmployeeModal } from "../EmployeeModal";

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
            {user.id !== item.id &&
              <>

                <Button size="xs" outline borderless variant="primary" onClick={() => setShowEditModal(true)}><IconEdit /></Button>
                <Button size="xs" outline borderless variant="danger" onClick={() => setShowDeleteModal(true)}><IconDelete /></Button>
              </>
            }
            {
              user.id === item.id &&
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    Management of currently logged in user is unavailable.
                  </Tooltip>
                }
              >
                <div className="text-muted">Your account</div>
              </OverlayTrigger>
            }
          </div>
        </Column>
      </Row>
      {showEditModal &&
        <EmployeeModal id={item.id} onClose={() => setShowEditModal(false)} />
      }
      {showDeleteModal &&
        <DeleteEmployeeModal item={item} onClose={() => setShowDeleteModal(false)} />
      }
    </>
  );
};