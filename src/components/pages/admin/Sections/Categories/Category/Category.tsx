import { Button, Column, Row } from "@src/components/common";
import { IconDelete, IconEdit } from "@src/components/icons";
import { Category as Model } from "@src/models/category";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EditCategoryModal } from "../CategoryModal/EditCategoryModal";
import { DeleteTableModal } from "../DeleteCategoryModal";

interface Props {
  item: Model;
  key?: any;
}

export const Category = ({ item }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Row centered>
        <Column>{item.id}</Column>
        <Column>{item.title}</Column>
        <Column>{item.description}</Column>
        <Column>
          <div className="d-flex justify-content-end gap-2">
            <Link to={`/e/admin/category/${item.id}/dishes`}>
              <Button size="xs" outline borderless variant="primary" className="px-2 text-nowrap">Manage dishes</Button>
            </Link>
            <Button size="xs" outline borderless variant="primary" onClick={() => setShowEditModal(true)}><IconEdit /></Button>
            <Button size="xs" outline borderless variant="danger" onClick={() => setShowDeleteModal(true)}><IconDelete /></Button>
          </div>
        </Column>
      </Row>
      {showEditModal &&
        <EditCategoryModal item={item} onClose={() => setShowEditModal(false)} />
      }
      {showDeleteModal &&
        <DeleteTableModal item={item} onClose={() => setShowDeleteModal(false)} />
      }
    </>
  );
};