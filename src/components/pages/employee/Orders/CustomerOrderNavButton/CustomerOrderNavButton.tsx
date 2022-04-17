import { IconAlert } from "@src/components/icons";
import { TableClaimStatus } from "@src/models/tableClaim";
import React from "react";
import { Nav } from "react-bootstrap";

export const CustomerOrderNavButton = ({
  item,
  setActiveOrder,
  setActiceCustomerOrder,
  index,
}: any) => {
  return (
    <Nav.Item key={item.id}>
      <Nav.Link eventKey={index} onClick={() => {
        setActiveOrder(index);
        setActiceCustomerOrder(0);
      }}>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div>
            <strong className="d-block">{item.table_claim.table.displayName}</strong>
            {item.table_claim.status === TableClaimStatus.CLOSED &&
              <small className="text-danger fw-bold">
                Claim Closed!
              </small>
            }
            {item.table_claim.status === TableClaimStatus.ACTIVE &&
              <div className="d-flex gap-2">
                <small>
                  {item.table_claim.customers.length} Customer{item.table_claim.customers.length > 1 ? 's' : ''}
                </small>
                {item.table_claim.allowSeatsBypass && item.table_claim.status === TableClaimStatus.ACTIVE &&
                  <small className="text-warning fw-bold">
                    Seats limit disabled!
                  </small>
                }
              </div>
            }
          </div>
          {item.table_claim.assistanceRequests && item.table_claim.assistanceRequests.length > 0 &&
            <strong className="text-warning">
              <IconAlert />
            </strong>
          }
        </div>
      </Nav.Link>
    </Nav.Item>
  );
};