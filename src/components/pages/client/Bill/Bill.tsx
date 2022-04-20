import { SectionHeader } from "@src/components/common";
import { Layout } from "@src/components/common/Layout";
import { useCustomerReceipt, useOrderRecepts, useOrderReceptTotal } from "@src/hooks/order";
import { formatPrice } from "@src/utils";
import React from "react";
import { BillTable } from "./BillTable";

export const BillPage = () => {
  const { data: customerReceipt } = useCustomerReceipt();
  const { data: orderReceipts } = useOrderRecepts();
  const { data: orderReceiptTotal } = useOrderReceptTotal();

  return (
    <Layout>
      <SectionHeader title="Your orders" />
      {customerReceipt &&
        <div className="card">
          <BillTable data={customerReceipt} />
        </div>
      }
      {orderReceipts && orderReceipts.orders.length > 0 &&
        <>
          <SectionHeader title="Your colleagues's orders" />
          <div className="card">
            <BillTable data={orderReceipts} showOwner={true} />
          </div>
        </>
      }
      <h2 className="d-flex justify-content-between mt-4 px-2 section-heading">
        <span>Total</span>
        {orderReceiptTotal && <span className="text-primary">{formatPrice(orderReceiptTotal.total)}</span>}
      </h2>

    </Layout>
  )
};