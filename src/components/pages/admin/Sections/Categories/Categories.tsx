import { Button, Card, SectionHeader, Table } from "@src/components/common";
import { IconAdd } from "@src/components/icons";
import { useGetCategories } from "@src/hooks/category";
import { Category as Model } from "@src/models/category";
import React, { useState } from "react";
import { Category as Row } from "./Category";
import { CreateCategoryModal } from "./CategoryModal";

const headers = [
  {
    title: '',
    width: '50px'
  },
  { title: 'Title' },
  { title: 'Description' },
  {
    title: 'Actions',
    width: '100px',
    style: {
      textAlign: 'right',
    }
  },
];

export const Categories = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data } = useGetCategories();

  return (
    <>
      <SectionHeader title="Dish categories" />
      <Card
        className="overflow-hidden"
        noBodyClass
        body={
          <>
            <div className="d-flex justify-content-end gap-2 p-2 px-3">
              <Button variant="link" size="sm" className="p-1" onClick={() => setShowCreateModal(true)}><IconAdd /></Button>
            </div>
            <Table
              headers={headers}
              rows={data && data.map((item: Model) => (
                <Row key={item.id} item={item} />
              ))}
            />
            <div className="card-body d-flex justify-content-between">
              <div className="d-flex gap-2"></div>
              <div className="d-flex gap-2">
                <Button size="sm" onClick={() => setShowCreateModal(true)}>Add new</Button>
              </div>
            </div>
          </>
        }
      />
      {showCreateModal && <CreateCategoryModal onClose={() => setShowCreateModal(false)} />}
    </>
  );
};