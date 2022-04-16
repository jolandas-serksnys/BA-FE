import React from "react";
import { CustomerReceipt } from "@src/models/order";
import { BillTableRow } from "./BillTableRow";
import { Row } from "./BillTable.style";

interface OrdersListProps {
  data: CustomerReceipt;
  showOwner?: boolean;
}

export const BillTable = ({ data, showOwner }: OrdersListProps) => {
  return (
    <table
      style={{
        width: "100%",
      }}
    >
      <thead>
        <Row>
          <th>Name</th>
          {showOwner && <th>By</th>}
          <th>Qty</th>
          <th
            style={{
              textAlign: "right",
            }}
          >
            Price
          </th>
        </Row>
      </thead>
      <tbody>
        {data.orders.map((order, index) => (
          <BillTableRow key={index} data={order} showOwner={showOwner} />
        ))}
        <Row>
          <td colSpan={showOwner ? 3 : 2}>
            <div
              style={{
                margin: "1rem 0",
              }}
            >
              <strong>Total</strong>
            </div>
          </td>
          <td
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                margin: "1rem 0",
              }}
            >
              <strong className="text-primary">{data.totalPrice} &euro;</strong>
            </div>
          </td>
        </Row>
      </tbody>
    </table>
  );
};