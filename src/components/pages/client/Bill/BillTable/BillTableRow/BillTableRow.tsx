import React from "react";
import { CustomerOrder } from "@src/models/order";
import { Row } from "../BillTable.style";
import { formatPrice } from "@src/utils";

interface OrdersListItemProps {
  data: CustomerOrder;
  showOwner?: boolean;
}

export const BillTableRow = ({ data, showOwner }: OrdersListItemProps) => {
  return (
    <Row>
      <td>{data.title}</td>
      {showOwner && <td>{data.owner.displayName}</td>}
      <td>{data.quantity}</td>
      <td
        style={{
          textAlign: "right",
        }}
      >
        {formatPrice(data.totalPrice)}
      </td>
    </Row>
  );
};