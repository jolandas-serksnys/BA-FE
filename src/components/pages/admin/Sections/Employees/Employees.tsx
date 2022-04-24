import { Button, Card, SectionHeader, Table } from "@src/components/common";
import { IconAdd } from "@src/components/icons";
import { useGetEmployees } from "@src/hooks/employee";
import { Employee as Model } from "@src/models/employee";
import React, { useState } from "react";
import { Employee as Row } from "./Employee";
import { SignUpCodeModal } from "./SignUpCodeModal";

const headers = [
  {
    title: '',
    width: '50px'
  },
  { title: 'Name' },
  { title: 'Role' },
  {
    title: 'Actions',
    width: '100px',
    style: {
      textAlign: 'right',
    }
  },
];

export const Employees = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data } = useGetEmployees();

  return (
    <>
      <SectionHeader title="Employees" />
      <Card
        className="overflow-hidden"
        noBodyClass
        body={
          <>
            <div className="d-flex justify-content-end gap-2 p-2 px-3" style={{ height: 52 }}></div>
            <Table
              headers={headers}
              rows={data && data.map((item: Model) => (
                <Row key={item.id} item={item} />
              ))}
            />
            <div className="card-body d-flex justify-content-between">
              <div className="d-flex gap-2"></div>
              <div className="d-flex gap-2">
                <Button size="sm" onClick={() => setShowCreateModal(true)}>Sign Up codes</Button>
              </div>
            </div>
          </>
        }
      />
      {showCreateModal &&
        <SignUpCodeModal onClose={() => setShowCreateModal(false)} />
      }
    </>
  );
};