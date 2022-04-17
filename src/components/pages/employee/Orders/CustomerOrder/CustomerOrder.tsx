import { activeOrdersQueryKey, model } from "@src/hooks/order";
import { CustomerOrder as Model, CustomerOrderStatus } from "@src/models/order";
import { capitalize, queryClient } from "@src/utils";
import clsx from "clsx";
import React, { useState } from "react";
import { Accordion, Dropdown } from "react-bootstrap";

interface Props {
  order: Model;
  index: number;
  setActiceCustomerOrder: (index: number) => void;
}

export const CustomerOrder = ({ order: data, index, setActiceCustomerOrder }: Props) => {
  const [order, setOrder] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    const hours = `${dateObj.getHours()}`.padStart(2, '0');
    const minutes = `${dateObj.getMinutes()}`.padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const updateStatus = async (status: CustomerOrderStatus) => {
    setIsLoading(true);
    const updatedData = await model().updateStatus(order.id, status);

    if (updatedData) {
      setOrder(updatedData);
    }

    queryClient.invalidateQueries(activeOrdersQueryKey);
    setIsLoading(false);
  };

  let statusLabelClass = "bg-primary";

  switch (order.status) {
    case CustomerOrderStatus.CREATED:
      statusLabelClass = "bg-success";
      break;
    case CustomerOrderStatus.CANCELLED:
      statusLabelClass = "bg-danger";
      break;
    default:
      statusLabelClass = "bg-primary";
  }

  return (
    <Accordion.Item eventKey={`${index}`} key={index} className="border-0">
      <Accordion.Header onClick={() => setActiceCustomerOrder(index)}>
        <div className="d-flex justify-content-between w-100 pe-3">
          <div className="d-flex gap-3 align-items-center">
            <div className="d-flex gap-1">
              {order.status &&
                <div className={clsx('badge', statusLabelClass)}>{capitalize(order.status)}</div>
              }
              {order.comment &&
                <div className="badge bg-warning">!</div>
              }
            </div>
            {order.title}
          </div>
          <div>
            {order.totalPrice} &euro;
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0 mt-1">
              <div className="badge bg-gray text-dark me-1 mb-1">Ordered at {formatDate(order.createdAt)}</div>
              {order.createdAt !== order.updatedAt &&
                <div className="badge bg-gray text-dark me-1 mb-1">Status updated at {formatDate(order.updatedAt)}</div>
              }
            </h5>
            <Dropdown align="end">
              <Dropdown.Toggle id="dropdown-basic" variant="gray" size="sm" disabled={isLoading}>
                {capitalize(order.status)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  Object.values(CustomerOrderStatus).map((status) => (
                    <Dropdown.Item key={status} onClick={() => updateStatus(status)}>{capitalize(status)}</Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <hr className="my-2" />
          {order.comment &&
            <div>
              <h6>Customer comment</h6>
              <div>{order.comment}</div>
            </div>
          }
          <h6 className="d-flex justify-content-between">
            <div>Base price</div>
            <div>{order.price} &euro;</div>
          </h6>
          {order.order_addons && order.order_addons.length > 0 &&
            <div>
              {order.order_addons.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <div>- {item.title}</div>
                  <div>{item.price} &euro;</div>
                </div>
              ))}
            </div>
          }
          <h6 className="d-flex justify-content-between">
            <span>Quantity:</span><strong>x {order.quantity}</strong>
          </h6>
          <h6 className="d-flex justify-content-between">
            <span>Total:</span><strong className="text-primary">{order.totalPrice} &euro;</strong>
          </h6>
          <hr className="my-2" />
          <div className="d-flex gap-2">
            <div className={clsx('avatar avatar-24 rounded-circle border border-2 bg-gray text-dark')}>
              <small className="d-inline-flex align-items-center justify-content-center">{order.owner.displayName[0]}</small>
            </div>
            <span>
              <strong>{order.owner.displayName}</strong> made this order
            </span>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};