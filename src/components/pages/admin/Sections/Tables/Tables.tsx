import { Button, Card, SectionHeader, Table } from "@src/components/common";
import { IconAdd } from "@src/components/icons";
import { useGetTables } from "@src/hooks/table";
import { Table as Model } from "@src/models/table";
import { Table as Row } from "./Table";
import React, { useState } from "react";
import { CreateTableModal } from "./TableModal";

const headers = [
  {
    title: '',
    width: '50px'
  },
  { title: 'Code' },
  { title: 'Display Name' },
  { title: 'Seats' },
  { title: 'Availability' },
  {
    title: 'Actions',
    width: '100px',
    style: {
      textAlign: 'right',
    },
  }
];

export const Tables = () => {
  const { data } = useGetTables();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <SectionHeader title="Tables" />
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
              rows={data && data.map((table: Model) => (
                <Row key={table.id} {...table} />
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
      {showCreateModal && <CreateTableModal onClose={() => setShowCreateModal(false)} />}
    </>
  );
};