import { Button } from "@src/components/common";
import { useAuth } from "@src/contexts/authContext";
import { model, orderClaimQueryKey } from "@src/hooks/order";
import { CustomerOrder } from "@src/models/order";
import { CustomerOrderStatus } from "@src/models/order";
import { capitalize, queryClient } from "@src/utils";
import clsx from "clsx";
import React, { useState } from "react";

interface Props {
  order: CustomerOrder;
}

export const Order = ({ order }: Props) => {
  const { user } = useAuth();
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
  };

  const cencelOrder = async (id: number) => {
    setIsLoadingCancel(true);
    await model().cancel(id);
    queryClient.invalidateQueries(orderClaimQueryKey);
    setIsLoadingCancel(false);
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
    <>
      <div className="d-flex gap-3 justify-content-between">
        <div className="d-flex gap-3">
          {order.status &&
            <h5 className="m-0">
              <div className={clsx('badge me-1 mb-1', statusLabelClass)}>{capitalize(order.status)}</div>
            </h5>
          }
          <h3 className="section-heading m-0">{order.title}</h3>
        </div>

        {order.owner.id === user.id && order.status === CustomerOrderStatus.CREATED &&
          <div>
            <Button
              size="sm"
              className="text-nowrap"
              variant="danger"
              outline
              isLoading={isLoadingCancel}
              disabled={isLoadingCancel}
              onClick={() => cencelOrder(order.id)}
            >
              Cancel
            </Button>
          </div>
        }
      </div>

      <div>
        {order.owner.id === user.id &&
          <div className="badge bg-primary me-1 mb-1">Your order</div>
        }
        <div className="badge bg-gray text-dark me-1 mb-1">Ordered at {formatDate(order.createdAt)}</div>
        {order.createdAt !== order.updatedAt &&
          <div className="badge bg-gray text-dark me-1 mb-1">Status updated at {formatDate(order.updatedAt)}</div>
        }
      </div>

      {order.comment &&
        <div className="mt-3">
          <h6>Customer comment</h6>
          <div>{order.comment}</div>
        </div>
      }

      <div className="d-flex justify-content-between mt-2">
        <h6>Base price</h6>
        <div>{order.price} &euro;</div>
      </div>
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
        <span>Quantity:</span> <strong>x {order.quantity}</strong>
      </h6>
      <h6 className="d-flex justify-content-between">
        <span>Total:</span>
        <strong className="text-primary">{order.totalPrice} &euro;</strong>
      </h6>
      {order.owner.id !== user.id &&
        <>
          <hr className="my-2" />
          <div className="d-flex gap-2">
            <div className={clsx('avatar avatar-24 rounded-circle border border-2 bg-gray text-dark')}>
              <small className="d-inline-flex align-items-center justify-content-center">{order.owner.displayName[0]}</small>
            </div>
            <span>
              <strong>{order.owner.displayName}</strong> made this order
            </span>
          </div>
        </>
      }
    </>
  );
}