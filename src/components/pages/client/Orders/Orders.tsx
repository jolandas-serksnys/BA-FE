import { Order } from "./Order";
import { Button, Card } from "@src/components/common";
import { AssistanceModal } from "@src/components/common/AssistanceModal";
import { Layout } from "@src/components/common/Layout";
import { useAuth } from "@src/contexts/authContext";
import { useTable } from "@src/contexts/tableContext";
import { useGetTableOrder } from "@src/hooks/order";
import { model, tableClaimQueryKey } from "@src/hooks/tableClaim";
import { Customer } from "@src/models/customer";
import { TableClaimStatus } from "@src/models/tableClaim";
import { queryClient } from "@src/utils";
import clsx from "clsx";
import React, { useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

export const OrdersPage = () => {
  const [showAssistanceModal, setShowAssistanceModal] = useState(false);

  const { user } = useAuth();
  const { tableClaim } = useTable();
  const { data, isLoading } = useGetTableOrder(tableClaim.id);

  if (isLoading) {
    return <>Loading...</>;
  }

  const toggleAccessRequests = async () => {
    await model().toggleAccessRequests();
    queryClient.invalidateQueries(tableClaimQueryKey);
  };

  return (
    <Layout>
      <div className="d-flex flex-column gap-3">
        {tableClaim.status === TableClaimStatus.CLOSED &&
          <div className="card bg-danger text-white p-3 px-4">
            You may no longer order new dishes, because the staff has closed your closed your table.
          </div>
        }
        <Card
          body={
            <div className="d-flex justify-content-between gap-3 align-items-center px-2 flex-column flex-md-row">
              <div className="avatar-group">
                {tableClaim && [user, ...tableClaim.customers.filter((customer: Customer) => customer.id !== user.id)].map((customer: Customer) => (
                  <OverlayTrigger
                    key={customer.id}
                    overlay={
                      <Tooltip id={`tooltip-${customer.id}`}>
                        {customer.displayName}
                      </Tooltip>
                    }
                  >
                    <div className={clsx('avatar avatar-32 rounded-circle border border-2 border-light', (customer.id === tableClaim.ownerId ? 'bg-secondary text-white' : 'bg-gray text-dark'))}>
                      <small className="d-inline-flex align-items-center justify-content-center">{customer.displayName[0]}</small>
                    </div>
                  </OverlayTrigger>
                ))}
              </div>
              <div className="d-flex gap-4 align-items-center">
                {tableClaim.requestsEnabled &&
                  <div className="text-end">
                    <span className="text-muted">Access code:</span>
                    <h5 className="m-0 section-heading">{tableClaim.requestCode}</h5>
                  </div>
                }
                <div>
                  <Button size="sm" onClick={toggleAccessRequests} variant={tableClaim.requestsEnabled ? "danger" : "primary"} outline className="text-nowrap">
                    {tableClaim.requestsEnabled ? 'Disable' : 'Enable'} Access Requests
                  </Button>
                </div>
                <div>
                  <Dropdown align="end">
                    <Dropdown.Toggle id="dropdown-basic" variant="outline-primary" size="sm" disabled={isLoading}>
                      Request assistance
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>I want to pay up</Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setShowAssistanceModal(true)}
                      >
                        I need other assistance
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          }
        />
        <div className="card">
          <div className="card-body">
            <ul className="list-group">
              {(!data || data.customer_orders.length === 0) &&
                <li className="list-group-item d-flex flex-column gap-3 px-4 py-5 text-center">
                  <span>
                    Dishes You and Your friends order will appear here.
                  </span>
                  <div className="d-flex justify-content-center">
                    <Link className="btn btn-gray" to={'/menu'}>
                      Take me to Menu
                    </Link>
                  </div>
                </li>
              }
              {data && data.customer_orders.map((order, index) => (
                <li key={index} className="list-group-item d-flex flex-column gap-2 p-4">
                  <Order order={order} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showAssistanceModal &&
        <AssistanceModal onClose={() => setShowAssistanceModal(false)} />
      }
    </Layout>
  );
};