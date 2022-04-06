import { Button, Card, SectionHeader, Table } from "@src/components/common";
import { IconAdd } from "@src/components/icons";
import { Category } from "@src/models/category";
import { Dish as Row } from "./Dish";
import React from "react";
import { Dish } from "@src/models/dish";

const headers = [
  {
    title: '',
    width: '50px'
  },
  { title: 'Title' },
  { title: 'Restriction' },
  { title: 'Price' },
  { title: 'Availability & Visibility' },
  {
    title: 'Actions',
    width: '200px',
    style: {
      textAlign: 'right',
    },
  }
];

interface Props {
  category: Category;
  dishes: Dish[];
}

export const Dishes = ({ category, dishes }: Props) => {
  return (
    <>
      <SectionHeader title={category.title} />
      <Card
        className="overflow-hidden"
        noBodyClass
        body={
          <>
            <div className="d-flex justify-content-end gap-2 p-2 px-3">
              <Button variant="link" size="sm" className="p-1"><IconAdd /></Button>
            </div>
            <Table
              headers={headers}
              rows={dishes?.map((item) => (
                <Row key={item.id} {...item} />
              ))}
            />
            <div className="card-body d-flex justify-content-between">
              <div className="d-flex gap-2"></div>
              <div className="d-flex gap-2">
                <Button size="sm">Add new</Button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};