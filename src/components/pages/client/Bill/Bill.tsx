import { SectionHeader } from "@src/components/common";
import { Layout } from "@src/components/common/Layout";
import { useCustomerReceipt, useOrderRecepts } from "@src/hooks/order";
import React, { useEffect } from "react";
import { BillTable } from "./BillTable";

export const BillPage = () => {
  const { data: customerReceipt } = useCustomerReceipt();
  const { data: orderReceipts } = useOrderRecepts();

  useEffect(() => {
    console.log(customerReceipt);
  }, [customerReceipt]);

  return (
    <Layout>
      <SectionHeader title="Your orders" />
      {customerReceipt &&
        <div className="card">
          <BillTable data={customerReceipt} />
        </div>
      }
      <SectionHeader title="Your colleagues's orders" />
      {orderReceipts &&
        <div className="card">
          <BillTable data={orderReceipts} showOwner={true} />
        </div>
      }
      <SectionHeader title="Total" />
      Hi
    </Layout>
  )
};