import { Button, Card, SectionHeader, Table } from "@src/components/common";
import { IconAdd } from "@src/components/icons";
import React, { useState } from "react";
import { Addon, Dish } from "@src/models/dish";
import { Addon as Row } from "./Addon";
import { CreateAddonModal } from "./AddonModal";

const headers = [
  {
    title: '',
    width: '50px'
  },
  {
    title: 'Title',
    style: {
      minWidth: '300px'
    }
  },
  { title: 'Required' },
  { title: 'Type' },
  { title: '# Options' },
  {
    title: 'Actions',
    width: '200px',
    style: {
      textAlign: 'right',
    },
  }
];

interface Props {
  dish: Dish;
  addons: Addon[];
}

export const Addons = ({ dish, addons }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SectionHeader title={dish.title} />
      <Card
        className="overflow-hidden"
        noBodyClass
        body={
          <>
            <div className="d-flex justify-content-end gap-2 p-2 px-3">
              <Button
                variant="link"
                size="sm"
                className="p-1"
                onClick={() => setShowModal(true)}
              >
                <IconAdd />
              </Button>
            </div>
            <Table
              headers={headers}
              rows={addons?.map((item) => (
                <Row key={item.id} item={item} dish={dish} />
              ))}
            />
            <div className="card-body d-flex justify-content-between">
              <div className="d-flex gap-2"></div>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setShowModal(true)}
                >
                  Add new
                </Button>
              </div>
            </div>
          </>
        }
      />
      {showModal &&
        <CreateAddonModal onClose={() => setShowModal(false)} dish={dish} />
      }
    </>
  );
};